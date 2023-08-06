#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# author wwqgtxx <wwqgtxx@gmail.com>
from __future__ import (absolute_import, division,
                        print_function, unicode_literals)
import os
import uuid
import threading
import pickle
import abc
import six
from itertools import islice as _islice, count as _count
from monotonic import monotonic as _time
from heapq import heappush as _heappush, heappop as _heappop

try:
    from _collections import deque as _deque
except ImportError:
    from collections import deque as _deque

try:
    import queue
except ImportError:
    import Queue as queue

try:
    from threading import get_ident as _theading_get_ident
except ImportError:
    from threading import _get_ident as _theading_get_ident

from redis import StrictRedis as _StrictRedis
from redis import ConnectionPool as _ConnectionPool
import redis_collections
import logging

_logger = logging.getLogger(__name__)
_logger.setLevel(logging.INFO)

_default_redis = _StrictRedis()

__all__ = ["RedisTools",
           "RedisDict", "RedisList", "RedisDeque", "RedisCounter", "RedisDefaultDict", "RedisNamespace",
           "RedisLock", "RedisRLock", "RedisCondition", "RedisSemaphore", "RedisBoundedSemaphore",
           "RedisEvent", "RedisBarrier", "RedisQueue", "PriorityRedisQueue", "LifoRedisQueue", "RedisPipe",
           "Empty", "Full",
           "BrokenBarrierError", "InvalidOperator",
           "get_unique_thread_id_str"
           ]


@six.add_metaclass(abc.ABCMeta)
class RedisTools(object):
    def destroy(self):
        """force destroy all data in redis database."""
        clear = getattr(self, "clear", None)
        if clear:
            clear()

    def _create_key(self):
        return "%s:AutoUUID:%s" % (self.__class__.__name__, uuid.uuid4().hex)

    def _pickle(self, data):
        """Converts given data to a bytes string.

        :param data: Data to be serialized.
        :type data: anything serializable
        :rtype: bytes
        """
        if six.PY34:
            return pickle.dumps(data, protocol=4)
        else:
            return pickle.dumps(data)

    def _pickle_3(self, data):
        # Several numeric types are equal, have the same hash, but nonetheless
        # pickle to different byte strings. This method reduces them down to
        # integers to help match with Python's behavior.
        # len({1.0, 1, complex(1, 0)}) == 1
        if isinstance(data, complex):
            int_data = int(data.real)
            if data == int_data:
                data = int_data
        elif isinstance(data, redis_collections.base.NUMERIC_TYPES):
            int_data = int(data)
            if data == int_data:
                data = int_data
        return self._pickle(data)

    def _clone_same_redis(self):
        connection_kwargs = self._redis.connection_pool.connection_kwargs
        connection_pool = _ConnectionPool(**connection_kwargs)
        new_redis = _StrictRedis(connection_pool=connection_pool)
        self._redis = new_redis

    def __repr__(self):
        cls_name = self.__class__.__name__
        _repr_data = getattr(self, "_repr_data", None)
        if _repr_data:
            data = _repr_data()
        else:
            data = ''
        key = getattr(self, "key", "UnKnown")
        if data:
            return '<%s at "%s" with %s>' % (cls_name, key, data)
        else:
            return '<%s at "%s">' % (cls_name, key)

    def _backup_redis(self, state):
        if "_redis" in state:
            redis = state.pop("_redis")
            state["redis_name"] = "_redis"
        elif "redis" in state:
            redis = state.pop("redis")
            state["redis_name"] = "redis"
        else:
            state["redis_name"] = None
            return state
        connection_kwargs = redis.connection_pool.connection_kwargs
        if connection_kwargs == _default_redis.connection_pool.connection_kwargs:
            connection_kwargs = None
        state["connection_kwargs"] = connection_kwargs
        return state

    def _restore_redis(self, state):
        redis_name = state.pop("redis_name")
        if redis_name:
            connection_kwargs = state.pop("connection_kwargs")
            if connection_kwargs:
                connection_pool = _ConnectionPool(**connection_kwargs)
                redis = _StrictRedis(connection_pool=connection_pool)
            else:
                redis = _default_redis
            state[redis_name] = redis

    def __getstate__(self):
        """Return state values to be pickled."""
        state = self.__dict__.copy()
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__dict__.update(state)


class RedisDict(RedisTools, redis_collections.Dict):
    if six.PY34:
        _pickle_key = RedisTools._pickle_3
        _pickle_value = RedisTools._pickle_3


class RedisList(RedisTools, redis_collections.List):
    pass


class RedisDeque(RedisTools, redis_collections.Deque):
    pass


class RedisCounter(RedisTools, redis_collections.Counter):
    pass


class RedisDefaultDict(RedisTools, redis_collections.DefaultDict):
    pass


class RedisNamespace(RedisTools):
    def __init__(self, redis=None, key=None):
        if not key:
            key = super(RedisNamespace, self)._create_key()
        if not redis:
            redis = _default_redis
        redis_dict = RedisDict(redis=redis, key=key)
        super(RedisNamespace, self).__setattr__("key", key)
        super(RedisNamespace, self).__setattr__("_redis", redis)
        super(RedisNamespace, self).__setattr__("_redis_dict", redis_dict)
        super(RedisNamespace, self).__setattr__("_local_dict", dict())
        super(RedisNamespace, self).__setattr__("destroy", redis_dict.destroy)

    def __getattribute__(self, item):
        try:
            if str(item).startswith('_'):
                return super(RedisNamespace, self).__getattribute__("_local_dict")[item]
            else:
                return super(RedisNamespace, self).__getattribute__("_redis_dict")[item]
        except AttributeError:
            pass
        except KeyError:
            pass
        return super(RedisNamespace, self).__getattribute__(item)

    def __setattr__(self, key, value):
        if key == "key":
            raise UserWarning('Can not change the key!')
        if str(key).startswith('_'):
            super(RedisNamespace, self).__getattribute__("_local_dict")[key] = value
        else:
            super(RedisNamespace, self).__getattribute__("_redis_dict")[key] = value

    def __delattr__(self, item):
        try:
            if str(item).startswith('_'):
                del super(RedisNamespace, self).__getattribute__("_local_dict")[item]
            else:
                del super(RedisNamespace, self).__getattribute__("_redis_dict")[item]
        except KeyError:
            pass
        raise AttributeError(item)

    def __getitem__(self, item):
        if str(item).startswith('_'):
            return super(RedisNamespace, self).__getattribute__("_local_dict")[item]
        else:
            return super(RedisNamespace, self).__getattribute__("_redis_dict")[item]

    def __setitem__(self, key, value):
        if str(key).startswith('_'):
            super(RedisNamespace, self).__getattribute__("_local_dict")[key] = value
        else:
            super(RedisNamespace, self).__getattribute__("_redis_dict")[key] = value

    def __delitem__(self, key):
        if str(key).startswith('_'):
            del super(RedisNamespace, self).__getattribute__("_local_dict")[key]
        else:
            del super(RedisNamespace, self).__getattribute__("_redis_dict")[key]

    def __getstate__(self):
        """Return state values to be pickled."""
        state = dict()
        state["key"] = super(RedisNamespace, self).__getattribute__("key")
        state["_local_dict"] = super(RedisNamespace, self).__getattribute__("_local_dict")
        connection_kwargs = super(RedisNamespace, self).__getattribute__("_redis").connection_pool.connection_kwargs
        state["connection_kwargs"] = connection_kwargs
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        connection_kwargs = state.pop("connection_kwargs")
        connection_pool = _ConnectionPool(**connection_kwargs)
        redis = _StrictRedis(connection_pool=connection_pool)
        key = state["key"]
        _local_dict = state["_local_dict"]
        redis_dict = RedisDict(redis=redis, key=key)
        super(RedisNamespace, self).__setattr__("key", key)
        super(RedisNamespace, self).__setattr__("_redis", redis)
        super(RedisNamespace, self).__setattr__("_redis_dict", redis_dict)
        super(RedisNamespace, self).__setattr__("_local_dict", _local_dict)
        super(RedisNamespace, self).__setattr__("destroy", redis_dict.destroy)


class InvalidOperator(RuntimeError):
    pass


class RedisLock(RedisTools):
    def __init__(self, redis=None, key=None, expire=None, care_operator=False):
        """
        :param redis:
            An instance of :class:`~StrictRedis`.
        :param key:
            The name (redis key) the lock should have.
        :param expire:
            The lock expiry time in seconds. If left at the default (None)
            the lock will not expire.
        """
        if not key:
            key = self._create_key()
        self.key = key
        if redis:
            self._redis = redis
            self._clone_same_redis()
        else:
            self._redis = _StrictRedis()
        self._expire = expire if expire is None else RedisLock.to_int(expire)
        self._name = key + ":_name"
        self._signal = key + ":_signal"
        self._owner = None
        self.care_operator = care_operator

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key,
            "expire": self._expire,
            "care_operator": self.care_operator,
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"], expire=state["expire"],
                      care_operator=state["care_operator"])

    @staticmethod
    def to_int(num):
        num = float(num)
        if num < 1:
            num = 1
        else:
            num = int(num)
        return num

    def acquire(self, blocking=True, timeout=None):
        if self.care_operator and self._owner == get_unique_thread_id_str():
            raise InvalidOperator("Already acquired lock by this process and this thread")
        timeout = timeout if timeout is None else RedisLock.to_int(timeout)
        if timeout is not None and timeout <= 0:
            timeout = None

        if timeout and self._expire and timeout > self._expire:
            _logger.warning("Timeout (%s) cannot be greater than expire (%d)" % (str(timeout), self._expire))
            timeout = self._expire

        blpop_timeout = timeout or self._expire or 0
        is_time_out = False
        while True:
            is_locked = not self._redis.set(self._name, self.key, nx=True, ex=self._expire)
            if is_locked:
                if is_time_out:
                    return False
                elif blocking:
                    is_time_out = not self._redis.blpop(self._signal, blpop_timeout) and timeout
                else:
                    _logger.debug("Failed to get %r.", self.key)
                    return False
            else:
                break

        _logger.debug("Got lock for %r.", self.key)
        self._owner = get_unique_thread_id_str()
        return True

    def __enter__(self):
        acquired = self.acquire(blocking=True)
        assert acquired, "Lock wasn't acquired, but blocking=True"
        return self

    def __exit__(self, exc_type=None, exc_value=None, traceback=None):
        self.release()

    def release(self):
        if (not self.care_operator) or self._owner == get_unique_thread_id_str():
            _logger.debug("Releasing %r.", self.key)
            self.reset(need_delete_all=False)
        else:
            raise InvalidOperator("cannot release lock by other thread or process")

    def reset(self, need_delete_all=True):
        """
        Forcibly deletes the lock. Use this with care.
        """
        pipe = self._redis.pipeline()
        with pipe:
            pipe.delete(self._signal)
            pipe.lpush(self._signal, 1)
            pipe.delete(self._name)
            # pipe.delete(self._signal)
            result = pipe.execute()
            # _logger.debug(result)
        self._owner = None
        if need_delete_all:
            self._delete_all()

    def destroy(self):
        self.reset()

    def _delete_all(self):
        pipe = self._redis.pipeline()
        with pipe:
            pipe.delete(self._signal)
            pipe.delete(self._name)
            result = pipe.execute()

    def _release_save(self):
        owner = self._owner
        self.release()
        return owner

    def _acquire_restore(self, x):
        self.acquire()
        self._owner = x

    def _is_owned(self):
        # Return True if lock is owned by current_thread.
        return self._owner == get_unique_thread_id_str()

    def locked(self):
        if self._is_owned():
            return True
        elif self.acquire(blocking=False):
            self.release()
            return False
        else:
            return True


def get_unique_thread_id_str():
    result = "<node:%s,pid:%s,thread_id:%s,thread_hash:%s>" % (
        str(uuid.getnode()), str(os.getpid()), str(_theading_get_ident()), str(hash(threading.current_thread())))
    # _logger.debug(result)
    return result


# modify from python35's threading.py
class RedisRLock(RedisTools):
    """This class implements reentrant lock objects.

    A reentrant lock must be released by the thread that acquired it. Once a
    thread has acquired a reentrant lock, the same thread may acquire it
    again without blocking; the thread must release it once for each time it
    has acquired it.

    """

    def __init__(self, redis=None, key=None, expire=None):
        if not key:
            key = self._create_key()
        self.key = key
        self._block_key = self.key + ":RedisLock:_block"
        self._block = RedisLock(redis=redis, key=self._block_key, expire=expire)
        self._owner = None
        self._count = 0

    def destroy(self):
        self._block.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._block._redis,
            "key": self.key,
            "expire": self._block._expire
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"], expire=state["expire"])

    def __repr__(self):
        owner = self._owner
        return "<%s %s.%s object owner=%s count=%d at %s>" % (
            "locked" if self._block.locked() else "unlocked",
            self.__class__.__module__,
            self.__class__.__qualname__,
            owner,
            self._count,
            hex(id(self))
        )

    def acquire(self, blocking=True, timeout=None):
        """Acquire a lock, blocking or non-blocking.

        When invoked without arguments: if this thread already owns the lock,
        increment the recursion level by one, and return immediately. Otherwise,
        if another thread owns the lock, block until the lock is unlocked. Once
        the lock is unlocked (not owned by any thread), then grab ownership, set
        the recursion level to one, and return. If more than one thread is
        blocked waiting until the lock is unlocked, only one at a time will be
        able to grab ownership of the lock. There is no return value in this
        case.

        When invoked with the blocking argument set to true, do the same thing
        as when called without arguments, and return true.

        When invoked with the blocking argument set to false, do not block. If a
        call without an argument would block, return false immediately;
        otherwise, do the same thing as when called without arguments, and
        return true.

        When invoked with the floating-point timeout argument set to a positive
        value, block for at most the number of seconds specified by timeout
        and as long as the lock cannot be acquired.  Return true if the lock has
        been acquired, false if the timeout has elapsed.

        """
        me = get_unique_thread_id_str()
        if self._owner == me:
            self._count += 1
            return self._count
        rc = self._block.acquire(blocking, timeout)
        if rc:
            self._owner = me
            self._count = 1
        return rc

    __enter__ = acquire

    def release(self):
        """Release a lock, decrementing the recursion level.

        If after the decrement it is zero, reset the lock to unlocked (not owned
        by any thread), and if any other threads are blocked waiting for the
        lock to become unlocked, allow exactly one of them to proceed. If after
        the decrement the recursion level is still nonzero, the lock remains
        locked and owned by the calling thread.

        Only call this method when the calling thread owns the lock. A
        RuntimeError is raised if this method is called when the lock is
        unlocked.

        There is no return value.

        """
        if self._owner != get_unique_thread_id_str() and self._count == 0:
            raise InvalidOperator("cannot release lock by other thread or process")
        self._count -= 1
        if self._count == 0:
            self._owner = None
            self._block.release()
        return self._count

    def __exit__(self, t, v, tb):
        self.release()

    # Internal methods used by condition variables

    def _acquire_restore(self, state):
        self._block.acquire()
        self._count, self._owner = state

    def _release_save(self):
        if self._count == 0:
            raise RuntimeError("cannot release un-acquired lock")
        count = self._count
        self._count = 0
        owner = self._owner
        self._owner = None
        self._block.release()
        return (count, owner)

    def _is_owned(self):
        # _logger.debug([self._owner, get_unique_thread_id_str(),self._owner == get_unique_thread_id_str()])
        # return self._owner == get_unique_thread_id_str()
        return self._block._is_owned()


# modify from python35's threading.py
class RedisCondition(RedisTools):
    """Class that implements a condition variable.

    A condition variable allows one or more threads to wait until they are
    notified by another thread.

    If the lock argument is given and not None, it must be a Lock or RLock
    object, and it is used as the underlying lock. Otherwise, a new RLock object
    is created and used as the underlying lock.

    """

    def __init__(self, lock=None, redis=None, key=None):
        if not key:
            key = self._create_key()
        self.key = key
        self._redis = redis or _default_redis
        if not isinstance(lock, RedisLock) and not isinstance(lock, RedisRLock):
            if lock:
                _logger.warning("the lock is not a RedisLock or RedisRLock,try to new a RedisRLock")
            self._lock_key = self.key + ":RedisRLock:_lock"
            lock = RedisRLock(redis=self._redis, key=self._lock_key)
            self._is_new_lock = True
        else:
            self._lock_key = lock.key
            self._is_new_lock = False
        self._lock = lock
        # Export the lock's acquire() and release() methods
        self.acquire = lock.acquire
        self.release = lock.release
        # If the lock defines _release_save() and/or _acquire_restore(),
        # these override the default implementations (which just call
        # release() and acquire() on the lock).  Ditto for _is_owned().
        try:
            self._release_save = lock._release_save
        except AttributeError:
            pass
        try:
            self._acquire_restore = lock._acquire_restore
        except AttributeError:
            pass
        try:
            self._is_owned = lock._is_owned
        except AttributeError:
            pass
        self._waiters_key = self.key + ":RedisDeque:_waiters"
        self._waiters = RedisDeque(redis=self._redis, key=self._waiters_key)

    def destroy(self):
        if self._is_new_lock:
            self._lock.destroy()
        for waiter_key in self._waiters:
            RedisLock(redis=_StrictRedis, key=waiter_key).destroy()
        self._waiters.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key,
            "_lock": self._lock
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(lock=state["_lock"], redis=state["_redis"], key=state["key"])

    def __enter__(self):
        return self._lock.__enter__()

    def __exit__(self, *args):
        return self._lock.__exit__(*args)

    def __repr__(self):
        return "<Condition(%s, %d)>" % (self._lock, len(self._waiters))

    def _release_save(self):
        self._lock.release()  # No state to save

    def _acquire_restore(self, x):
        self._lock.acquire()  # Ignore saved state

    def _is_owned(self):
        # Return True if lock is owned by current_thread.
        # This method is called only if _lock doesn't have _is_owned().
        if self._lock.acquire(blocking=False):
            self._lock.release()
            return False
        else:
            return True

    def wait(self, timeout=None):
        """Wait until notified or until a timeout occurs.

        If the calling thread has not acquired the lock when this method is
        called, a RuntimeError is raised.

        This method releases the underlying lock, and then blocks until it is
        awakened by a notify() or notify_all() call for the same condition
        variable in another thread, or until the optional timeout occurs. Once
        awakened or timed out, it re-acquires the lock and returns.

        When the timeout argument is present and not None, it should be a
        floating point number specifying a timeout for the operation in seconds
        (or fractions thereof).

        When the underlying lock is an RLock, it is not released using its
        release() method, since this may not actually unlock the lock when it
        was acquired multiple times recursively. Instead, an internal interface
        of the RLock class is used, which really unlocks it even when it has
        been recursively acquired several times. Another internal interface is
        then used to restore the recursion level when the lock is reacquired.

        """
        if not self._is_owned():
            raise RuntimeError("cannot wait on un-acquired lock")
        waiter = RedisLock(redis=self._redis)
        waiter.acquire()
        _logger.debug("add new waiter <%s>" % str(waiter))
        self._waiters.append(waiter.key)
        saved_state = self._release_save()
        gotit = False
        try:  # restore state no matter what (e.g., KeyboardInterrupt)
            _logger.debug("try get waiter <%s> 's lock" % str(waiter))
            if timeout is None:
                waiter.acquire()
                gotit = True
            else:
                if timeout > 0:
                    gotit = waiter.acquire(True, timeout)
                else:
                    gotit = waiter.acquire(False)
            _logger.debug("finish got waiter <%s> 's lock" % str(waiter))
            return gotit
        finally:
            self._acquire_restore(saved_state)
            if not gotit:
                try:
                    self._waiters.remove(waiter.key)
                    _logger.debug("remove a waiter <%s>" % str(waiter))
                except ValueError:
                    pass
            waiter.reset()

    def wait_for(self, predicate, timeout=None):
        """Wait until a condition evaluates to True.

        predicate should be a callable which result will be interpreted as a
        boolean value.  A timeout may be provided giving the maximum time to
        wait.

        """
        endtime = None
        waittime = timeout
        result = predicate()
        while not result:
            if waittime is not None:
                if endtime is None:
                    endtime = _time() + waittime
                else:
                    waittime = endtime - _time()
                    if waittime <= 0:
                        break
            self.wait(waittime)
            result = predicate()
        return result

    def notify(self, n=1):
        """Wake up one or more threads waiting on this condition, if any.

        If the calling thread has not acquired the lock when this method is
        called, a RuntimeError is raised.

        This method wakes up at most n of the threads waiting for the condition
        variable; it is a no-op if no threads are waiting.

        """
        if not self._is_owned():
            raise RuntimeError("cannot notify on un-acquired lock")
        all_waiters = self._waiters
        waiters_to_notify = _deque(_islice(all_waiters, n))
        _logger.debug("waiters_to_notify <%s>" % str(waiters_to_notify))
        if not waiters_to_notify:
            return
        for waiter_key in waiters_to_notify:
            _logger.debug(waiter_key)
            waiter = RedisLock(redis=self._redis, key=waiter_key)
            try:
                waiter.release()
                _logger.debug("release a waiter <%s>" % str(waiter))
                try:
                    all_waiters.remove(waiter_key)
                    _logger.debug("remove a waiter <%s>" % str(waiter))
                except:
                    _logger.warning("can't remove waiter <%s>" % str(waiter), exc_info=True)
            except InvalidOperator:
                _logger.warning("can't release waiter <%s>" % str(waiter), exc_info=True)

    def notify_all(self):
        """Wake up all threads waiting on this condition.

        If the calling thread has not acquired the lock when this method
        is called, a RuntimeError is raised.

        """
        self.notify(len(self._waiters))

    notifyAll = notify_all


# modify from python35's threading.py
class RedisSemaphore(RedisTools):
    """This class implements semaphore objects.

    Semaphores manage a counter representing the number of release() calls minus
    the number of acquire() calls, plus an initial value. The acquire() method
    blocks if necessary until it can return without making the counter
    negative. If not given, value defaults to 1.

    """

    # After Tim Peters' semaphore class, but not quite the same (no maximum)

    def __init__(self, value=1, redis=None, key=None):
        if value < 0:
            raise ValueError("semaphore initial value must be >= 0")
        self._redis = redis or _default_redis
        if not key:
            key = self._create_key()
        self.key = key
        self._lock_key = self.key + ":RedisLock:_lock"
        self._cond_key = self.key + ":RedisCondition:_cond"
        self._class_dict_key = self.key + ":RedisDict:_class_dict"
        self._class_dict = RedisDict(redis=self._redis, key=self._class_dict_key)
        self._lock = RedisLock(redis=self._redis, key=self._lock_key)
        self._cond = RedisCondition(lock=self._lock, redis=self._redis, key=self._cond_key)
        self._class_dict["_value"] = self._class_dict.get("_value", value)

    def destroy(self):
        self._class_dict.destroy()
        self._lock.destroy()
        self._cond.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"])

    def acquire(self, blocking=True, timeout=None):
        """Acquire a semaphore, decrementing the internal counter by one.

        When invoked without arguments: if the internal counter is larger than
        zero on entry, decrement it by one and return immediately. If it is zero
        on entry, block, waiting until some other thread has called release() to
        make it larger than zero. This is done with proper interlocking so that
        if multiple acquire() calls are blocked, release() will wake exactly one
        of them up. The implementation may pick one at random, so the order in
        which blocked threads are awakened should not be relied on. There is no
        return value in this case.

        When invoked with blocking set to true, do the same thing as when called
        without arguments, and return true.

        When invoked with blocking set to false, do not block. If a call without
        an argument would block, return false immediately; otherwise, do the
        same thing as when called without arguments, and return true.

        When invoked with a timeout other than None, it will block for at
        most timeout seconds.  If acquire does not complete successfully in
        that interval, return false.  Return true otherwise.

        """
        if not blocking and timeout is not None:
            raise ValueError("can't specify timeout for non-blocking acquire")
        rc = False
        endtime = None
        with self._cond:
            while self._class_dict["_value"] == 0:
                if not blocking:
                    break
                if timeout is not None:
                    if endtime is None:
                        endtime = _time() + timeout
                    else:
                        timeout = endtime - _time()
                        if timeout <= 0:
                            break
                self._cond.wait(timeout)
            else:
                self._class_dict["_value"] -= 1
                rc = True
        return rc

    __enter__ = acquire

    def release(self):
        """Release a semaphore, incrementing the internal counter by one.

        When the counter is zero on entry and another thread is waiting for it
        to become larger than zero again, wake up that thread.

        """
        with self._cond:
            self._class_dict["_value"] += 1
            self._cond.notify()

    def __exit__(self, t, v, tb):
        self.release()


# modify from python35's threading.py
class RedisBoundedSemaphore(RedisSemaphore):
    """Implements a bounded semaphore.

    A bounded semaphore checks to make sure its current value doesn't exceed its
    initial value. If it does, ValueError is raised. In most situations
    semaphores are used to guard resources with limited capacity.

    If the semaphore is released too many times it's a sign of a bug. If not
    given, value defaults to 1.

    Like regular semaphores, bounded semaphores manage a counter representing
    the number of release() calls minus the number of acquire() calls, plus an
    initial value. The acquire() method blocks if necessary until it can return
    without making the counter negative. If not given, value defaults to 1.

    """

    def __init__(self, value=1, redis=None, key=None):
        RedisSemaphore.__init__(self, value, redis=redis, key=key)
        self._class_dict["_initial_value"] = self._class_dict.get("_initial_value", value)

    def release(self):
        """Release a semaphore, incrementing the internal counter by one.

        When the counter is zero on entry and another thread is waiting for it
        to become larger than zero again, wake up that thread.

        If the number of releases exceeds the number of acquires,
        raise a ValueError.

        """
        with self._cond:
            if self._class_dict["_value"] >= self._class_dict["_initial_value"]:
                raise ValueError("Semaphore released too many times")
            self._class_dict["_value"] += 1
            self._cond.notify()


# modify from python35's threading.py
class RedisEvent(RedisTools):
    """Class implementing event objects.

    Events manage a flag that can be set to true with the set() method and reset
    to false with the destroy() method. The wait() method blocks until the flag is
    true.  The flag is initially false.

    """

    # After Tim Peters' event class (without is_posted())

    def __init__(self, redis=None, key=None):
        self._redis = redis or _default_redis
        if not key:
            key = self._create_key()
        self.key = key
        self._lock_key = self.key + ":RedisLock:_lock"
        self._cond_key = self.key + ":RedisCondition:_cond"
        self._class_dict_key = self.key + ":RedisDict:_class_dict"
        self._class_dict = RedisDict(redis=self._redis, key=self._class_dict_key)
        self._lock = RedisLock(redis=self._redis, key=self._lock_key)
        self._cond = RedisCondition(lock=self._lock, redis=self._redis, key=self._cond_key)
        self._class_dict["_flag"] = self._class_dict.get("_flag", False)

    def destroy(self):
        self._class_dict.destroy()
        self._lock.destroy()
        self._cond.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"])

    def _reset_internal_locks(self):
        # private!  called by Thread._reset_internal_locks by _after_fork()
        self._lock = RedisLock(redis=self._redis, key=self._lock_key)
        self._cond = RedisCondition(lock=self._lock, redis=self._redis, key=self._cond_key)

    def is_set(self):
        """Return true if and only if the internal flag is true."""
        return self._flag

    isSet = is_set

    def set(self):
        """Set the internal flag to true.

        All threads waiting for it to become true are awakened. Threads
        that call wait() once the flag is true will not block at all.

        """
        with self._cond:
            self._flag = True
            self._cond.notify_all()

    def clear(self):
        """Reset the internal flag to false.

        Subsequently, threads calling wait() will block until set() is called to
        set the internal flag to true again.

        """
        with self._cond:
            self._flag = False

    def wait(self, timeout=None):
        """Block until the internal flag is true.

        If the internal flag is true on entry, return immediately. Otherwise,
        block until another thread calls set() to set the flag to true, or until
        the optional timeout occurs.

        When the timeout argument is present and not None, it should be a
        floating point number specifying a timeout for the operation in seconds
        (or fractions thereof).

        This method returns the internal flag on exit, so it will always return
        True except if a timeout is given and the operation times out.

        """
        with self._cond:
            signaled = self._flag
            if not signaled:
                signaled = self._cond.wait(timeout)
            return signaled


# modify from python35's threading.py
class RedisBarrier(RedisTools):
    """Implements a Barrier.

    Useful for synchronizing a fixed number of threads at known synchronization
    points.  Threads block on 'wait()' and are simultaneously once they have all
    made that call.

    """

    def __init__(self, parties, action=None, timeout=None, redis=None, key=None):
        """Create a barrier, initialised to 'parties' threads.

        'action' is a callable which, when supplied, will be called by one of
        the threads after they have all entered the barrier and just prior to
        releasing them all. If a 'timeout' is provided, it is uses as the
        default for all subsequent 'wait()' calls.

        """
        self._redis = redis or _default_redis
        if not key:
            key = self._create_key()
        self.key = key
        self._lock_key = self.key + ":RedisRLock:_lock"
        self._cond_key = self.key + ":RedisCondition:_cond"
        self._class_dict_key = self.key + ":RedisDict:_class_dict"
        self._class_dict = RedisDict(redis=self._redis, key=self._class_dict_key)
        self._lock = RedisRLock(redis=self._redis, key=self._lock_key)
        self._cond = RedisCondition(lock=self._lock, redis=self._redis, key=self._cond_key)
        self._class_dict["_action"] = self._class_dict.get("_action", action)
        self._class_dict["_timeout"] = self._class_dict.get("_timeout", timeout)
        self._class_dict["_parties"] = self._class_dict.get("_parties", parties)
        self._class_dict["_state"] = self._class_dict.get("_state",
                                                          0)  # 0 filling, 1, draining, -1 resetting, -2 broken
        self._class_dict["_count"] = self._class_dict.get("_count", 0)

    def destroy(self):
        self._class_dict.destroy()
        self._lock.destroy()
        self._cond.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key,
            "parties": self.parties
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(parties=state["parties"], redis=state["_redis"], key=state["key"])

    def wait(self, timeout=None):
        """Wait for the barrier.

        When the specified number of threads have started waiting, they are all
        simultaneously awoken. If an 'action' was provided for the barrier, one
        of the threads will have executed that callback prior to returning.
        Returns an individual index number from 0 to 'parties-1'.

        """
        if timeout is None:
            timeout = self._class_dict["_timeout"]
        with self._cond:
            self._enter()  # Block while the barrier drains.
            index = self._class_dict["_count"]
            self._class_dict["_count"] += 1
            try:
                if index + 1 == self._class_dict["_parties"]:
                    # We release the barrier
                    self._release()
                else:
                    # We wait until someone releases us
                    self._wait(timeout)
                return index
            finally:
                self._class_dict["_count"] -= 1
                # Wake up any threads waiting for barrier to drain.
                self._exit()

    # Block until the barrier is ready for us, or raise an exception
    # if it is broken.
    def _enter(self):
        while self._class_dict["_state"] in (-1, 1):
            # It is draining or resetting, wait until done
            self._cond.wait()
        # see if the barrier is in a broken state
        if self._class_dict["_state"] < 0:
            raise BrokenBarrierError
        assert self._class_dict["_state"] == 0

    # Optionally run the 'action' and release the threads waiting
    # in the barrier.
    def _release(self):
        try:
            if self._class_dict["_action"]:
                self._class_dict["_action"]()
            # enter draining state
            self._class_dict["_state"] = 1
            self._cond.notify_all()
        except:
            # an exception during the _action handler.  Break and reraise
            self._break()
            raise

    # Wait in the barrier until we are relased.  Raise an exception
    # if the barrier is reset or broken.
    def _wait(self, timeout):
        if not self._cond.wait_for(lambda: self._class_dict["_state"] != 0, timeout):
            # timed out.  Break the barrier
            self._break()
            raise BrokenBarrierError
        if self._class_dict["_state"] < 0:
            raise BrokenBarrierError
        assert self._class_dict["_state"] == 1

    # If we are the last thread to exit the barrier, signal any threads
    # waiting for the barrier to drain.
    def _exit(self):
        if self._class_dict["_count"] == 0:
            if self._class_dict["_state"] in (-1, 1):
                # resetting or draining
                self._class_dict["_state"] = 0
                self._cond.notify_all()

    def reset(self):
        """Reset the barrier to the initial state.

        Any threads currently waiting will get the BrokenBarrier exception
        raised.

        """
        with self._cond:
            if self._class_dict["_count"] > 0:
                if self._class_dict["_state"] == 0:
                    # reset the barrier, waking up threads
                    self._class_dict["_state"] = -1
                elif self._class_dict["_state"] == -2:
                    # was broken, set it to reset state
                    # which clears when the last thread exits
                    self._class_dict["_state"] = -1
            else:
                self._class_dict["_state"] = 0
            self._cond.notify_all()

    def abort(self):
        """Place the barrier into a 'broken' state.

        Useful in case of error.  Any currently waiting threads and threads
        attempting to 'wait()' will have BrokenBarrierError raised.

        """
        with self._cond:
            self._break()

    def _break(self):
        # An internal error was detected.  The barrier is set to
        # a broken state all parties awakened.
        self._class_dict["_state"] = -2
        self._cond.notify_all()

    @property
    def parties(self):
        """Return the number of threads required to trip the barrier."""
        return self._class_dict["_parties"]

    @property
    def n_waiting(self):
        """Return the number of threads currently waiting at the barrier."""
        # We don't need synchronization here since this is an ephemeral result
        # anyway.  It returns the correct value in the steady state.
        if self._class_dict["_state"] == 0:
            return self._class_dict["_count"]
        return 0

    @property
    def broken(self):
        """Return True if the barrier is in a broken state."""
        return self._class_dict["_state"] == -2


try:
    BrokenBarrierError = threading.BrokenBarrierError
except AttributeError:
    # exception raised by the Barrier class
    class BrokenBarrierError(RuntimeError):
        pass

Empty = queue.Empty
Full = queue.Full


# modify from python35's queue.py
class RedisQueue(RedisTools):
    '''Create a queue object with a given maximum size.

    If maxsize is <= 0, the queue size is infinite.
    '''

    def __init__(self, maxsize=0, redis=None, key=None):
        self._redis = redis or _default_redis
        if not key:
            key = self._create_key()
        self.key = key
        self.mutex_key = self.key + ":RedisLock:mutex"
        self.not_empty_key = self.key + ":RedisCondition:not_empty"
        self.not_full_key = self.key + ":RedisCondition:not_full"
        self.all_tasks_done_key = self.key + ":RedisCondition:all_tasks_done"
        self._class_dict_key = self.key + ":RedisDict:_class_dict"

        self._class_dict = RedisDict(redis=self._redis, key=self._class_dict_key)
        self.maxsize = self._class_dict.get("maxsize", maxsize)
        self._class_dict["maxsize"] = self.maxsize
        self._init(maxsize)

        try:
            self._repr_data = self.queue._repr_data
        except AttributeError:
            pass

        # mutex must be held whenever the queue is mutating.  All methods
        # that acquire mutex must release it before returning.  mutex
        # is shared between the three conditions, so acquiring and
        # releasing the conditions also acquires and releases mutex.
        self.mutex = RedisLock(redis=self._redis, key=self.mutex_key)

        # Notify not_empty whenever an item is added to the queue; a
        # thread waiting to get is notified then.
        self.not_empty = RedisCondition(lock=self.mutex, redis=self._redis, key=self.not_empty_key)

        # Notify not_full whenever an item is removed from the queue;
        # a thread waiting to put is notified then.
        self.not_full = RedisCondition(lock=self.mutex, redis=self._redis, key=self.not_full_key)

        # Notify all_tasks_done whenever the number of unfinished tasks
        # drops to zero; thread waiting to join() is notified to resume
        self.all_tasks_done = RedisCondition(lock=self.mutex, redis=self._redis, key=self.all_tasks_done_key)
        # self.unfinished_tasks = 0
        self._class_dict["unfinished_tasks"] = 0

    def destroy(self):
        self.queue.destroy()
        self._class_dict.destroy()
        self.not_empty.destroy()
        self.not_full.destroy()
        self.mutex.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key,
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"])

    def task_done(self):
        '''Indicate that a formerly enqueued task is complete.

        Used by Queue consumer threads.  For each get() used to fetch a task,
        a subsequent call to task_done() tells the queue that the processing
        on the task is complete.

        If a join() is currently blocking, it will resume when all items
        have been processed (meaning that a task_done() call was received
        for every item that had been put() into the queue).

        Raises a ValueError if called more times than there were items
        placed in the queue.
        '''
        with self.all_tasks_done:
            unfinished = self._class_dict["unfinished_tasks"] - 1
            if unfinished <= 0:
                if unfinished < 0:
                    raise ValueError('task_done() called too many times')
                self.all_tasks_done.notify_all()
            self._class_dict["unfinished_tasks"] = unfinished

    def join(self):
        '''Blocks until all items in the Queue have been gotten and processed.

        The count of unfinished tasks goes up whenever an item is added to the
        queue. The count goes down whenever a consumer thread calls task_done()
        to indicate the item was retrieved and all work on it is complete.

        When the count of unfinished tasks drops to zero, join() unblocks.
        '''
        with self.all_tasks_done:
            while self._class_dict["unfinished_tasks"]:
                self.all_tasks_done.wait()

    def qsize(self):
        '''Return the approximate size of the queue (not reliable!).'''
        with self.mutex:
            return self._qsize()

    def empty(self):
        '''Return True if the queue is empty, False otherwise (not reliable!).

        This method is likely to be removed at some point.  Use qsize() == 0
        as a direct substitute, but be aware that either approach risks a race
        condition where a queue can grow before the result of empty() or
        qsize() can be used.

        To create code that needs to wait for all queued tasks to be
        completed, the preferred technique is to use the join() method.
        '''
        with self.mutex:
            return not self._qsize()

    def full(self):
        '''Return True if the queue is full, False otherwise (not reliable!).

        This method is likely to be removed at some point.  Use qsize() >= n
        as a direct substitute, but be aware that either approach risks a race
        condition where a queue can shrink before the result of full() or
        qsize() can be used.
        '''
        with self.mutex:
            return 0 < self.maxsize <= self._qsize()

    def put(self, item, block=True, timeout=None):
        '''Put an item into the queue.

        If optional args 'block' is true and 'timeout' is None (the default),
        block if necessary until a free slot is available. If 'timeout' is
        a non-negative number, it blocks at most 'timeout' seconds and raises
        the Full exception if no free slot was available within that time.
        Otherwise ('block' is false), put an item on the queue if a free slot
        is immediately available, else raise the Full exception ('timeout'
        is ignored in that case).
        '''
        with self.not_full:
            if self.maxsize > 0:
                if not block:
                    if self._qsize() >= self.maxsize:
                        raise Full
                elif timeout is None:
                    while self._qsize() >= self.maxsize:
                        self.not_full.wait()
                elif timeout < 0:
                    raise ValueError("'timeout' must be a non-negative number")
                else:
                    endtime = _time() + timeout
                    while self._qsize() >= self.maxsize:
                        remaining = endtime - _time()
                        if remaining <= 0.0:
                            raise Full
                        self.not_full.wait(remaining)
            self._put(item)
            _logger.debug('finish putting "%s"' % str(item))
            self._class_dict["unfinished_tasks"] += 1
            self.not_empty.notify()

    def get(self, block=True, timeout=None):
        '''Remove and return an item from the queue.

        If optional args 'block' is true and 'timeout' is None (the default),
        block if necessary until an item is available. If 'timeout' is
        a non-negative number, it blocks at most 'timeout' seconds and raises
        the Empty exception if no item was available within that time.
        Otherwise ('block' is false), return an item if one is immediately
        available, else raise the Empty exception ('timeout' is ignored
        in that case).
        '''
        with self.not_empty:
            if not block:
                if not self._qsize():
                    raise Empty
            elif timeout is None:
                while not self._qsize():
                    _logger.debug('start a not_empty.wait')
                    self.not_empty.wait()
                    _logger.debug('finish a not_empty.wait')
            elif timeout < 0:
                raise ValueError("'timeout' must be a non-negative number")
            else:
                endtime = _time() + timeout
                while not self._qsize():
                    remaining = endtime - _time()
                    if remaining <= 0.0:
                        raise Empty
                    self.not_empty.wait(remaining)
            item = self._get()
            _logger.debug('finish got "%s"' % str(item))
            self.not_full.notify()
            return item

    def put_nowait(self, item):
        '''Put an item into the queue without blocking.

        Only enqueue the item if a free slot is immediately available.
        Otherwise raise the Full exception.
        '''
        return self.put(item, block=False)

    def get_nowait(self):
        '''Remove and return an item from the queue without blocking.

        Only get an item if one is immediately available. Otherwise
        raise the Empty exception.
        '''
        return self.get(block=False)

    # Override these methods to implement other queue organizations
    # (e.g. stack or priority queue).
    # These will only be called with appropriate locks held

    # Initialize the queue representation
    def _init(self, maxsize):
        self.queue_key = self.key + ":RedisDeque:queue"
        self.queue = RedisDeque(redis=self._redis, key=self.queue_key)

    def _qsize(self):
        return len(self.queue)

    # Put a new item in the queue
    def _put(self, item):
        self.queue.append(item)

    # Get an item from the queue
    def _get(self):
        return self.queue.popleft()


# modify from python35's queue.py
class PriorityRedisQueue(RedisQueue):
    '''Variant of Queue that retrieves open entries in priority order (lowest first).

    Entries are typically tuples of the form:  (priority number, data).
    '''

    def _init(self, maxsize):
        self.queue_key = self.key + ":RedisList:queue"
        self.queue = RedisList(redis=self._redis, key=self.queue_key)

    def _qsize(self):
        return len(self.queue)

    def _put(self, item):
        _heappush(self.queue, item)

    def _get(self):
        return _heappop(self.queue)


# modify from python35's queue.py
class LifoRedisQueue(RedisQueue):
    '''Variant of Queue that retrieves most recently added entries first.'''

    def _init(self, maxsize):
        self.queue_key = self.key + ":RedisList:queue"
        self.queue = RedisList(redis=self._redis, key=self.queue_key)

    def _qsize(self):
        return len(self.queue)

    def _put(self, item):
        self.queue.append(item)

    def _get(self):
        return self.queue.pop()


class RedisPipe(RedisTools):
    A = "A"
    B = "B"
    INPUT = "INPUT"
    OUTPUT = "OUTPUT"

    def __init__(self, maxsize=0, redis=None, key=None, channel=A):
        self._redis = redis or _default_redis
        if not key:
            key = self._create_key()
        self.key = key
        self.lock_A_key = self.key + ":RedisRLock:lock_A"
        self.lock_B_key = self.key + ":RedisRLock:lock_B"
        self.queue_A_key = self.key + ":RedisQueue:queue_A"
        self.queue_B_key = self.key + ":RedisQueue:queue_B"
        self.lock_A = RedisRLock(redis=self._redis, key=self.lock_A_key)
        self.lock_B = RedisRLock(redis=self._redis, key=self.lock_B_key)
        self.queue_A = RedisQueue(maxsize=maxsize, redis=self._redis, key=self.queue_A_key)
        self.queue_B = RedisQueue(maxsize=maxsize, redis=self._redis, key=self.queue_B_key)
        self.input_queue = None  # type: RedisQueue
        self.output_queue = None  # type: RedisQueue
        self.lock = None  # type: RedisLock
        self.channel = None
        self.set_channel(channel)

    def set_channel(self, channel=A):
        if channel == RedisPipe.A:
            self.input_queue = self.queue_A
            self.output_queue = self.queue_B
            self.lock = self.lock_A
        elif channel == RedisPipe.B:
            self.input_queue = self.queue_B
            self.output_queue = self.queue_A
            self.lock = self.lock_B
        else:
            raise ValueError(channel)
        self.channel = channel

    def clone(self):
        return RedisPipe(redis=self._redis, key=self.key, channel=self.channel)

    def destroy(self):
        self.queue_A.destroy()
        self.queue_B.destroy()
        self.lock_A.destroy()
        self.lock_B.destroy()

    def __getstate__(self):
        """Return state values to be pickled."""
        state = {
            "_redis": self._redis,
            "key": self.key,
            "channel": self.channel
        }
        self._backup_redis(state)
        return state

    def __setstate__(self, state):
        """Restore state from the unpickled state values."""
        self._restore_redis(state)
        self.__init__(redis=state["_redis"], key=state["key"], channel=state["channel"])

    def acquire(self, blocking=True, timeout=None):
        return self.lock.acquire(blocking, timeout)

    def __enter__(self):
        return self.lock.__enter__()

    def __exit__(self, exc_type=None, exc_value=None, traceback=None):
        return self.lock.__exit__(exc_type, exc_value, traceback)

    def release(self):
        return self.lock.release()

    def empty(self, channel):
        if channel == RedisPipe.INPUT:
            return self.input_queue.empty()
        elif channel == RedisPipe.OUTPUT:
            return self.output_queue.empty()
        else:
            raise ValueError(channel)

    def full(self, channel):
        if channel == RedisPipe.INPUT:
            return self.input_queue.full()
        elif channel == RedisPipe.OUTPUT:
            return self.output_queue.full()
        else:
            raise ValueError(channel)

    def put(self, item, block=True, timeout=None):
        return self.input_queue.put(item, block, timeout)

    def get(self, block=True, timeout=None):
        return self.output_queue.get(block, timeout)

    def put_nowait(self, item):
        return self.put(item, block=False)

    def get_nowait(self):
        return self.get(block=False)


def open_debug():
    import sys
    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s{%(name)s}%(filename)s[line:%(lineno)d]<%(funcName)s> pid:%(process)d %(threadName)s %(levelname)s : %(message)s',
                        datefmt='%H:%M:%S', stream=sys.stdout)
    _logger.setLevel(logging.DEBUG)
