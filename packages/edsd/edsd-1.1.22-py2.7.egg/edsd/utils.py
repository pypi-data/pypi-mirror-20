# coding:utf-8
# Copyright (C) Alibaba Group

"""
edas-detector.utils : holds a bunch of fundamental methods which used in the
    check points' method.
"""

import functools
import os
import sys

from . import __version__
from edsd.err import Ignore, Failed, Fine

__author__ = "Thomas Li <yanliang.lyl@alibaba-inc.com>"
__license__ = "GNU License"

'''Enable verbose output for the check points' execution'''
DEBUG = False

'''DEFAULT_COLUMNS: Max line width while logging the output message.
'''
DEFAULT_COLUMNS = 64

try:
    _, columns = os.popen('stty size 2> /dev/null').read().split()
    DEFAULT_COLUMNS = int(columns) - 26
except Exception as e:
    if DEBUG:
        import traceback

        traceback.print_exc()

'''
Check points:
    each function represents a check point, this list is a collection of check
    points.
'''
checks = []


def info_(msg, end=False):
    log(None, msg, end=end, width=0)


def log(status, msg, end=True, width=DEFAULT_COLUMNS):
    """Log a message down into the terminal after formatted, this function should
    able to select different stdout method according to the terminal type, e.g:
    use colorized output for a ANSI Colored terminal; and plain text output for
    a file output, etc.

    :param status: represent a status message such as FAIL, SUCCESS, DONE.
    :param msg: the message needs to be emit.
    :param end: An '\n' will be appended in the end if 'end' is True, default
        is True
    :param width: The line width.
    :return: None
    """
    is_point = getattr(msg, '_point_id', None) is not None
    msg = format_point(msg) if is_point else msg

    if width == 0:
        tpl = u'\r{0}'.format(msg)
    else:
        tpl = (u'\r{0:.<' + unicode(width) + u'}[{1}]').format(msg, status)

    if end:
        tpl += u'\n'

    sys.stdout.write(tpl.encode('utf-8'))


def get_seq_id():
    import inspect
    seq_id = None
    frame = inspect.currentframe().f_back

    for x in xrange(0, 4):
        seq_id = frame.f_locals.get('func_id', None)
        if seq_id is not None:
            return seq_id

        seq_id = frame.f_locals.get('seq_id', None)
        if seq_id is not None:
            return seq_id

        frame = frame.f_back
        if frame is None:
            break

    if seq_id is None:
        return u' +'


log_ok = functools.partial(log, 'OK')
log_fail = functools.partial(log, 'FAIL')
log_warn = functools.partial(log, 'WARN')
log_done = functools.partial(log, 'DONE')
log_done_success = functools.partial(log, 'DONE/SUCCESS')
log_done_fail = functools.partial(log, 'DONE/FAIL')
log_check = functools.partial(log, 'CHECK')
log_point = functools.partial(log, 'POINT')
log_start = functools.partial(log, 'START CHECKING')


def report(clz, msg):
    """An utility used and ONLY USED in the checkpoint functions to report the
    result, this method is only to raise an exception to end the function's
    execution immediately.

    :param clz: The exception class about to raise.
    :param msg: Status message
    :raise : see clz, e,g: Fine(represents OK) or Failed (represents FAILED)
    """
    raise clz(msg)


report_ok = functools.partial(report, Fine)
report_fail = functools.partial(report, Failed)


def run():
    info_(u"正在为您开始EDAS运行环境的依赖检测,请稍候...", end=True)

    try:
        for f in checks: f()
    except Exception:
        if DEBUG:
            import traceback
            traceback.print_exc()

    log_done(u'已完成 EDAS 所有依赖环境检测.')


def check(name=None, strict=True):
    """The check point decorator,

    :param name: Check point's name, default set to the function's name if
            this is empty
    :param strict: exit the whole process if the check point is failed.
    :return: A wrapped decorator.
    """

    from inspect import getmembers as mbs, ismethod as ism

    def dec(clz):
        points = mbs(clz, lambda f: ism(f) and getattr(f, '_is_point', False))

        def getpt(t, idx):
            _, p = t
            p.im_func._point_id = idx + 1
            return p

        pts = map(getpt, points, xrange(0, len(points)))
        ch_name = name
        func_id = len(checks) + 1

        classname = clz.__name__ + "$Proxy"
        bases = (clz, CheckBase) + clz.__bases__
        attributes = dict(_ch_name=ch_name, _check_id=func_id, _points=pts,
                          _strict=strict)
        Clazz = type(classname, bases, attributes)

        checks.append(Clazz())

    return dec

'''
This field remember the execution failed point on every time's check
'''
failed_point = None


def view_last_failed():
    if failed_point is None or len(failed_point) == 0:
        print "\tno failed point"
        return

    for p in failed_point:
        log_point(p)

    print failed_point.__doc__


class CheckBase(object):
    def print_me(self, i=None, detail=False):
        log_check(self)
        if not detail:
            return
        return self.print_point(i)

    def view_solution(self, i):
        self.print_me()
        point = self.print_point(i)
        if not point:
            return
        print point.__doc__

    def check(self, i=None):
        if i is not None:
            p = self.get_point(i)
            if p is None:
                print "\tpoint id '{0}' not found.".format(i + 1)
                return

        log_start(self)
        try:
            if i is None:
                for p in self._points:
                    if self.run_point(p) is False:
                        return False
                return True
            return self.run_point(p)
        finally:
            done = log_done_fail if failed_point else log_done_success
            done(self)

    def run_point(self, point):
        global failed_point

        failed_point = None
        f = getattr(self, point.func_name)
        try:
            log_start(point, end=False)
            f()
            log_ok(point)
        except Failed as fe:
            failed_point = point
            log_fail('%s, Failed Reason: %s..' %
                     (format_point(point), fe.message))
            return False

        return True

    def __str__(self):
        return '{0: >3}: [{1}]'.format(self._check_id, self._ch_name)

    def print_point(self, i=None):
        if i is None:
            return map(log_point, self._points)

        p = self.get_point(i)
        if p:
            log_point(p)
            return p

        print "\tpoint id '{0}' not found.".format(i + 1)

    def get_point(self, i):
        try:
            return self._points[i]
        except:
            return None


def point(name=None, strict=True):
    """decorator for a checkpoint

    :param name:
    :param strict:
    :return:
    """
    def dec(method):
        meth_name = name or method.func_name
        method._is_point = True
        method._point_name = meth_name

        @functools.wraps(method)
        def wp(self, *args, **kwargs):
            try:
                method(self, *args, **kwargs)
            except Ignore, Fine:
                return
            except Failed as _:
                raise
            except Exception as e:
                if DEBUG:
                    import traceback
                    traceback.print_exc()
                raise Failed(e.message)
            else:
                return

        return wp

    return dec


def format_point(f):
    return '   *{0: >2}: ({1: >16})'.format(f._point_id, f._point_name)


def get_class_defined_method(method):
    import inspect
    for cls in inspect.getmro(method.im_class):
        if method.__name__ in cls.__dict__:
            return cls
    return None
