# vim: ft=python fileencoding=utf-8 sts=4 sw=4 et:

# Copyright 2016 Florian Bruhin (The Compiler) <mail@qutebrowser.org>
#
# This file is part of qutebrowser.
#
# qutebrowser is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# qutebrowser is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with qutebrowser.  If not, see <http://www.gnu.org/licenses/>.

"""Backend-independent qute:* code.

Module attributes:
    pyeval_output: The output of the last :pyeval command.
    _HANDLERS: The handlers registered via decorators.
"""

import sys
import time
import datetime
import urllib.parse

from PyQt5.QtCore import QUrlQuery

import qutebrowser
from qutebrowser.utils import (version, utils, jinja, log, message, docutils,
                               objreg)
from qutebrowser.misc import objects


pyeval_output = ":pyeval was never called"


_HANDLERS = {}


class NoHandlerFound(Exception):

    """Raised when no handler was found for the given URL."""

    pass


class QuteSchemeOSError(Exception):

    """Called when there was an OSError inside a handler."""

    pass


class QuteSchemeError(Exception):

    """Exception to signal that a handler should return an ErrorReply.

    Attributes correspond to the arguments in
    networkreply.ErrorNetworkReply.

    Attributes:
        errorstring: Error string to print.
        error: Numerical error value.
    """

    def __init__(self, errorstring, error):
        self.errorstring = errorstring
        self.error = error
        super().__init__(errorstring)


class add_handler:  # pylint: disable=invalid-name

    """Decorator to register a qute:* URL handler.

    Attributes:
        _name: The 'foo' part of qute:foo
        backend: Limit which backends the handler can run with.
    """

    def __init__(self, name, backend=None):
        self._name = name
        self._backend = backend
        self._function = None

    def __call__(self, function):
        self._function = function
        _HANDLERS[self._name] = self.wrapper
        return function

    def wrapper(self, *args, **kwargs):
        if self._backend is not None and objects.backend != self._backend:
            return self.wrong_backend_handler(*args, **kwargs)
        else:
            return self._function(*args, **kwargs)

    def wrong_backend_handler(self, url):
        """Show an error page about using the invalid backend."""
        html = jinja.render('error.html',
                            title="Error while opening qute:url",
                            url=url.toDisplayString(),
                            error='{} is not available with this '
                                  'backend'.format(url.toDisplayString()),
                            icon='')
        return 'text/html', html


def data_for_url(url):
    """Get the data to show for the given URL.

    Args:
        url: The QUrl to show.

    Return:
        A (mimetype, data) tuple.
    """
    path = url.path()
    host = url.host()
    # A url like "qute:foo" is split as "scheme:path", not "scheme:host".
    log.misc.debug("url: {}, path: {}, host {}".format(
        url.toDisplayString(), path, host))
    try:
        handler = _HANDLERS[path]
    except KeyError:
        try:
            handler = _HANDLERS[host]
        except KeyError:
            raise NoHandlerFound(url)
    try:
        mimetype, data = handler(url)
    except OSError as e:
        # FIXME:qtwebengine how to handle this?
        raise QuteSchemeOSError(e)
    except QuteSchemeError as e:
        raise

    assert mimetype is not None, url
    if mimetype == 'text/html' and isinstance(data, str):
        # We let handlers return HTML as text
        data = data.encode('utf-8', errors='xmlcharrefreplace')

    return mimetype, data


@add_handler('bookmarks')
def qute_bookmarks(_url):
    """Handler for qute:bookmarks. Display all quickmarks / bookmarks."""
    bookmarks = sorted(objreg.get('bookmark-manager').marks.items(),
                       key=lambda x: x[1])  # Sort by title
    quickmarks = sorted(objreg.get('quickmark-manager').marks.items(),
                        key=lambda x: x[0])  # Sort by name

    html = jinja.render('bookmarks.html',
                        title='Bookmarks',
                        bookmarks=bookmarks,
                        quickmarks=quickmarks)
    return 'text/html', html


@add_handler('history')  # noqa
def qute_history(url):
    """Handler for qute:history. Display history."""
    # Get current date from query parameter, if not given choose today.
    curr_date = datetime.date.today()
    try:
        query_date = QUrlQuery(url).queryItemValue("date")
        if query_date:
            curr_date = datetime.datetime.strptime(query_date, "%Y-%m-%d")
            curr_date = curr_date.date()
    except ValueError:
        log.misc.debug("Invalid date passed to qute:history: " + query_date)

    one_day = datetime.timedelta(days=1)
    next_date = curr_date + one_day
    prev_date = curr_date - one_day

    def history_iter(reverse):
        """Iterate through the history and get items we're interested in."""
        curr_timestamp = time.mktime(curr_date.timetuple())
        history = objreg.get('web-history').history_dict.values()
        if reverse:
            history = reversed(history)

        for item in history:
            # If we can't apply the reverse performance trick below,
            # at least continue as early as possible with old items.
            # This gets us down from 550ms to 123ms with 500k old items on my
            # machine.
            if item.atime < curr_timestamp and not reverse:
                continue

            # Convert timestamp
            try:
                item_atime = datetime.datetime.fromtimestamp(item.atime)
            except (ValueError, OSError, OverflowError):
                log.misc.debug("Invalid timestamp {}.".format(item.atime))
                continue

            if reverse and item_atime.date() < curr_date:
                # If we could reverse the history in-place, and this entry is
                # older than today, only older entries will follow, so we can
                # abort here.
                return

            # Skip items not on curr_date
            # Skip redirects
            # Skip qute:// links
            is_internal = item.url.scheme() == 'qute'
            is_not_today = item_atime.date() != curr_date
            if item.redirect or is_internal or is_not_today:
                continue

            # Use item's url as title if there's no title.
            item_url = item.url.toDisplayString()
            item_title = item.title if item.title else item_url
            display_atime = item_atime.strftime("%X")

            yield (item_url, item_title, display_atime)

    if sys.hexversion >= 0x03050000:
        # On Python >= 3.5 we can reverse the ordereddict in-place and thus
        # apply an additional performance improvement in history_iter.
        # On my machine, this gets us down from 550ms to 72us with 500k old
        # items.
        history = list(history_iter(reverse=True))
    else:
        # On Python 3.4, we can't do that, so we'd need to copy the entire
        # history to a list. There, filter first and then reverse it here.
        history = reversed(list(history_iter(reverse=False)))

    html = jinja.render('history.html',
                        title='History',
                        history=history,
                        curr_date=curr_date,
                        next_date=next_date,
                        prev_date=prev_date,
                        today=datetime.date.today())
    return 'text/html', html


@add_handler('pyeval')
def qute_pyeval(_url):
    """Handler for qute:pyeval."""
    html = jinja.render('pre.html', title='pyeval', content=pyeval_output)
    return 'text/html', html


@add_handler('version')
@add_handler('verizon')
def qute_version(_url):
    """Handler for qute:version."""
    html = jinja.render('version.html', title='Version info',
                        version=version.version(),
                        copyright=qutebrowser.__copyright__)
    return 'text/html', html


@add_handler('plainlog')
def qute_plainlog(url):
    """Handler for qute:plainlog.

    An optional query parameter specifies the minimum log level to print.
    For example, qute://log?level=warning prints warnings and errors.
    Level can be one of: vdebug, debug, info, warning, error, critical.
    """
    if log.ram_handler is None:
        text = "Log output was disabled."
    else:
        try:
            level = urllib.parse.parse_qs(url.query())['level'][0]
        except KeyError:
            level = 'vdebug'
        text = log.ram_handler.dump_log(html=False, level=level)
    html = jinja.render('pre.html', title='log', content=text)
    return 'text/html', html


@add_handler('log')
def qute_log(url):
    """Handler for qute:log.

    An optional query parameter specifies the minimum log level to print.
    For example, qute://log?level=warning prints warnings and errors.
    Level can be one of: vdebug, debug, info, warning, error, critical.
    """
    if log.ram_handler is None:
        html_log = None
    else:
        try:
            level = urllib.parse.parse_qs(url.query())['level'][0]
        except KeyError:
            level = 'vdebug'
        html_log = log.ram_handler.dump_log(html=True, level=level)

    html = jinja.render('log.html', title='log', content=html_log)
    return 'text/html', html


@add_handler('gpl')
def qute_gpl(_url):
    """Handler for qute:gpl. Return HTML content as string."""
    return 'text/html', utils.read_file('html/COPYING.html')


@add_handler('help')
def qute_help(url):
    """Handler for qute:help."""
    try:
        utils.read_file('html/doc/index.html')
    except OSError:
        html = jinja.render(
            'error.html',
            title="Error while loading documentation",
            url=url.toDisplayString(),
            error="This most likely means the documentation was not generated "
                  "properly. If you are running qutebrowser from the git "
                  "repository, please run scripts/asciidoc2html.py. "
                  "If you're running a released version this is a bug, please "
                  "use :report to report it.",
            icon='')
        return 'text/html', html
    urlpath = url.path()
    if not urlpath or urlpath == '/':
        urlpath = 'index.html'
    else:
        urlpath = urlpath.lstrip('/')
    if not docutils.docs_up_to_date(urlpath):
        message.error("Your documentation is outdated! Please re-run "
                      "scripts/asciidoc2html.py.")
    path = 'html/doc/{}'.format(urlpath)
    if urlpath.endswith('.png'):
        return 'image/png', utils.read_file(path, binary=True)
    else:
        data = utils.read_file(path)
        return 'text/html', data
