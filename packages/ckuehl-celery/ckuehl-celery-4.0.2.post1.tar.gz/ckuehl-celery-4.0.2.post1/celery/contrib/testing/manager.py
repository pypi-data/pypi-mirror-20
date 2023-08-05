"""Integration testing utilities."""
from __future__ import absolute_import, print_function, unicode_literals

import socket
import sys

from collections import defaultdict
from functools import partial
from itertools import count

from kombu.utils.functional import retry_over_time

from celery.exceptions import TimeoutError
from celery.five import items
from celery.result import ResultSet
from celery.utils.text import truncate
from celery.utils.time import humanize_seconds as _humanize_seconds

E_STILL_WAITING = 'Still waiting for {0}.  Trying again {when}: {exc!r}'

humanize_seconds = partial(_humanize_seconds, microseconds=True)


class Sentinel(Exception):
    """Signifies the end of something."""


class ManagerMixin(object):
    """Mixin that adds :class:`Manager` capabilities."""

    def _init_manager(self,
                      block_timeout=30 * 60.0, no_join=False,
                      stdout=None, stderr=None):
        # type: (float, bool, TextIO, TextIO) -> None
        self.stdout = sys.stdout if stdout is None else stdout
        self.stderr = sys.stderr if stderr is None else stderr
        self.connerrors = self.app.connection().recoverable_connection_errors
        self.block_timeout = block_timeout
        self.no_join = no_join

    def remark(self, s, sep='-'):
        # type: (str, str) -> None
        print('{0}{1}'.format(sep, s), file=self.stdout)

    def missing_results(self, r):
        # type: (Sequence[AsyncResult]) -> Sequence[str]
        return [res.id for res in r if res.id not in res.backend._cache]

    def wait_for(self, fun, catch,
                 desc='thing', args=(), kwargs={}, errback=None,
                 max_retries=10, interval_start=0.1, interval_step=0.5,
                 interval_max=5.0, emit_warning=False, **options):
        # type: (Callable, Sequence[Any], str, Tuple, Dict, Callable,
        #        int, float, float, float, bool, **Any) -> Any
        """Wait for event to happen.

        The `catch` argument specifies the exception that means the event
        has not happened yet.
        """
        def on_error(exc, intervals, retries):
            interval = next(intervals)
            if emit_warning:
                self.warn(E_STILL_WAITING.format(
                    desc, when=humanize_seconds(interval, 'in', ' '), exc=exc,
                ))
            if errback:
                errback(exc, interval, retries)
            return interval

        return self.retry_over_time(
            fun, catch,
            args=args, kwargs=kwargs,
            errback=on_error, max_retries=max_retries,
            interval_start=interval_start, interval_step=interval_step,
            **options
        )

    def ensure_not_for_a_while(self, fun, catch,
                               desc='thing', max_retries=20,
                               interval_start=0.1, interval_step=0.02,
                               interval_max=1.0, emit_warning=False,
                               **options):
        """Make sure something does not happen (at least for a while)."""
        try:
            return self.wait_for(
                fun, catch, desc=desc, max_retries=max_retries,
                interval_start=interval_start, interval_step=interval_step,
                interval_max=interval_max, emit_warning=emit_warning,
            )
        except catch:
            pass
        else:
            raise AssertionError('Should not have happened: {0}'.format(desc))

    def retry_over_time(self, *args, **kwargs):
        return retry_over_time(*args, **kwargs)

    def join(self, r, propagate=False, max_retries=10, **kwargs):
        if self.no_join:
            return
        if not isinstance(r, ResultSet):
            r = self.app.ResultSet([r])
        received = []

        def on_result(task_id, value):
            received.append(task_id)

        for i in range(max_retries) if max_retries else count(0):
            received[:] = []
            try:
                return r.get(callback=on_result, propagate=propagate, **kwargs)
            except (socket.timeout, TimeoutError) as exc:
                waiting_for = self.missing_results(r)
                self.remark(
                    'Still waiting for {0}/{1}: [{2}]: {3!r}'.format(
                        len(r) - len(received), len(r),
                        truncate(', '.join(waiting_for)), exc), '!',
                )
            except self.connerrors as exc:
                self.remark('join: connection lost: {0!r}'.format(exc), '!')
        raise AssertionError('Test failed: Missing task results')

    def inspect(self, timeout=3.0):
        return self.app.control.inspect(timeout=timeout)

    def query_tasks(self, ids, timeout=0.5):
        for reply in items(self.inspect(timeout).query_task(*ids) or {}):
            yield reply

    def query_task_states(self, ids, timeout=0.5):
        states = defaultdict(set)
        for hostname, reply in self.query_tasks(ids, timeout=timeout):
            for task_id, (state, _) in items(reply):
                states[state].add(task_id)
        return states

    def assert_accepted(self, ids, interval=0.5,
                        desc='waiting for tasks to be accepted', **policy):
        return self.assert_task_worker_state(
            self.is_accepted, ids, interval=interval, desc=desc, **policy
        )

    def assert_received(self, ids, interval=0.5,
                        desc='waiting for tasks to be received', **policy):
        return self.assert_task_worker_state(
            self.is_accepted, ids, interval=interval, desc=desc, **policy
        )

    def assert_task_worker_state(self, fun, ids, interval=0.5, **policy):
        return self.wait_for(
            partial(self.true_or_raise, fun, ids, timeout=interval),
            (Sentinel,), **policy
        )

    def is_received(self, ids, **kwargs):
        return self._ids_matches_state(
            ['reserved', 'active', 'ready'], ids, **kwargs)

    def is_accepted(self, ids, **kwargs):
        return self._ids_matches_state(['active', 'ready'], ids, **kwargs)

    def _ids_matches_state(self, expected_states, ids, timeout=0.5):
        states = self.query_task_states(ids, timeout=timeout)
        return all(
            any(t in s for s in [states[k] for k in expected_states])
            for t in ids
        )

    def true_or_raise(self, fun, *args, **kwargs):
        res = fun(*args, **kwargs)
        if not res:
            raise Sentinel()
        return res


class Manager(ManagerMixin):
    """Test helpers for task integration tests."""

    def __init__(self, app, **kwargs):
        self.app = app
        self._init_manager(**kwargs)
