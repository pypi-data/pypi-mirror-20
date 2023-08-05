@cython.no_gc_clear
cdef class UVHandle:
    """A base class for all libuv handles.

    Automatically manages memory deallocation and closing.

    Important:

       1. call "_ensure_alive()" before calling any libuv functions on
          your handles.

       2. call "__ensure_handle_data" in *all* libuv handle callbacks.
    """

    def __cinit__(self):
        self._closed = 0
        self._inited = 0
        self._handle = NULL
        self._loop = None
        self._source_traceback = None

    def __init__(self):
        raise TypeError(
            '{} is not supposed to be instantiated from Python'.format(
                self.__class__.__name__))

    def __dealloc__(self):
        if UVLOOP_DEBUG:
            if self._loop is not None:
                self._loop._debug_handles_current.subtract([
                    self.__class__.__name__])
            else:
                # No "@cython.no_gc_clear" decorator on this UVHandle
                raise RuntimeError(
                    '{} without @no_gc_clear; loop was set to None by GC'
                    .format(self.__class__.__name__))

        if self._handle is NULL:
            return

        # -> When we're at this point, something is wrong <-

        if self._handle.loop is NULL:
            # The handle wasn't initialized with "uv_{handle}_init"
            self._closed = 1
            self._free()
            raise RuntimeError(
                '{} is open in __dealloc__ with loop set to NULL'
                .format(self.__class__.__name__))

        if self._closed == 1:
            # So _handle is not NULL and self._closed == 1?
            raise RuntimeError(
                '{}.__dealloc__: _handle is NULL, _closed == 1'.format(
                    self.__class__.__name__))

        # The handle is dealloced while open.  Let's try to close it.
        # Situations when this is possible include unhandled exceptions,
        # errors during Handle.__cinit__/__init__ etc.
        if self._inited:
            self._handle.data = NULL
            uv.uv_close(self._handle, __uv_close_handle_cb) # void; no errors
            self._handle = NULL
            self._warn_unclosed()
        else:
            # The handle was allocated, but not initialized
            self._closed = 1
            self._free()

    cdef inline _free(self):
        if self._handle == NULL:
            return

        if UVLOOP_DEBUG:
            self._loop._debug_uv_handles_freed += 1

        PyMem_RawFree(self._handle)
        self._handle = NULL

    cdef _warn_unclosed(self):
        if self._source_traceback is not None:
            tb = ''.join(tb_format_list(self._source_traceback))
            tb = 'object created at (most recent call last):\n{}'.format(
                tb.rstrip())
            msg = 'unclosed resource {!r}; {}'.format(self, tb)
        else:
            msg = 'unclosed resource {!r}'.format(self)
        warnings_warn(msg, ResourceWarning)

    cdef inline _abort_init(self):
        if self._handle is not NULL:
            self._free()

        if UVLOOP_DEBUG:
            name = self.__class__.__name__
            if self._inited:
                raise RuntimeError(
                    '_abort_init: {}._inited is set'.format(name))
            if self._closed:
                raise RuntimeError(
                    '_abort_init: {}._closed is set'.format(name))

        self._closed = 1

    cdef inline _finish_init(self):
        self._inited = 1
        self._handle.data = <void*>self
        if self._loop._debug:
            self._source_traceback = tb_extract_stack(sys_getframe(0))
        if UVLOOP_DEBUG:
            self._loop._debug_uv_handles_total += 1

    cdef inline _start_init(self, Loop loop):
        if UVLOOP_DEBUG:
            if self._loop is not None:
                raise RuntimeError(
                    '{}._start_init can only be called once'.format(
                        self.__class__.__name__))

            cls_name = self.__class__.__name__
            loop._debug_handles_total.update([cls_name])
            loop._debug_handles_current.update([cls_name])

        self._loop = loop

    cdef inline bint _is_alive(self):
        cdef bint res
        res = self._closed != 1 and self._inited == 1
        if UVLOOP_DEBUG:
            if res:
                name = self.__class__.__name__
                if self._handle is NULL:
                    raise RuntimeError(
                        '{} is alive, but _handle is NULL'.format(name))
                if self._loop is None:
                    raise RuntimeError(
                        '{} is alive, but _loop is None'.format(name))
                if self._handle.loop is not self._loop.uvloop:
                    raise RuntimeError(
                        '{} is alive, but _handle.loop is not '
                        'initialized'.format(name))
                if self._handle.data is not <void*>self:
                    raise RuntimeError(
                        '{} is alive, but _handle.data is not '
                        'initialized'.format(name))
        return res

    cdef inline _ensure_alive(self):
        if not self._is_alive():
            raise RuntimeError(
                'unable to perform operation on {!r}; '
                'the handler is closed'.format(self))

    cdef _fatal_error(self, exc, throw, reason=None):
        # Fatal error means an error that was returned by the
        # underlying libuv handle function.  We usually can't
        # recover from that, hence we just close the handle.
        self._close()

        if throw or self._loop is None:
            raise exc
        else:
            self._loop._handle_exception(exc)

    cdef _error(self, exc, throw):
        # A non-fatal error is usually an error that was caught
        # by the handler, but was originated in the client code
        # (not in libuv).  In this case we either want to simply
        # raise or log it.
        if throw or self._loop is None:
            raise exc
        else:
            self._loop._handle_exception(exc)

    cdef _close(self):
        if self._closed == 1:
            return

        self._closed = 1

        if self._handle is NULL:
            return

        if UVLOOP_DEBUG:
            if self._handle.data is NULL:
                raise RuntimeError(
                    '{}._close: _handle.data is NULL'.format(
                        self.__class__.__name__))

            if <object>self._handle.data is not self:
                raise RuntimeError(
                    '{}._close: _handle.data is not UVHandle/self'.format(
                        self.__class__.__name__))

            if uv.uv_is_closing(self._handle):
                raise RuntimeError(
                    '{}._close: uv_is_closing() is true'.format(
                        self.__class__.__name__))

        # We want the handle wrapper (UVHandle) to stay alive until
        # the closing callback fires.
        Py_INCREF(self)
        uv.uv_close(self._handle, __uv_close_handle_cb) # void; no errors

    def __repr__(self):
        return '<{} closed={} {:#x}>'.format(
            self.__class__.__name__,
            self._closed,
            id(self))


@cython.no_gc_clear
cdef class UVSocketHandle(UVHandle):

    def __cinit__(self):
        self._fileobj = None
        self.__cached_socket = None

    cdef inline _fileno(self):
        cdef:
            int fd
            int err

        self._ensure_alive()
        err = uv.uv_fileno(self._handle, <uv.uv_os_fd_t*>&fd)
        if err < 0:
            raise convert_error(err)

        return fd

    cdef _new_socket(self):
        raise NotImplementedError

    cdef inline _get_socket(self):
        if self.__cached_socket is not None:
            return self.__cached_socket

        if not self._is_alive():
            return None

        self.__cached_socket = self._new_socket()
        if UVLOOP_DEBUG:
            # We don't "dup" for the "__cached_socket".
            assert self.__cached_socket.fileno() == self._fileno()
        return self.__cached_socket

    cdef inline _attach_fileobj(self, object file):
        # When we create a TCP/PIPE/etc connection/server based on
        # a Python file object, we need to close the file object when
        # the uv handle is closed.
        self._fileobj = file

    cdef _close(self):
        try:
            if self.__cached_socket is not None:
                self.__cached_socket.detach()
                self.__cached_socket = None

            if self._fileobj is not None:
                try:
                    self._fileobj.close()
                except Exception as exc:
                    self._loop.call_exception_handler({
                        'exception': exc,
                        'transport': self,
                        'message': 'could not close attached file object {!r}'.
                            format(self._fileobj)
                    })
                finally:
                    self._fileobj = None
        finally:
            UVHandle._close(self)

    cdef _open(self, int sockfd):
        raise NotImplementedError


cdef inline bint __ensure_handle_data(uv.uv_handle_t* handle,
                                      const char* handle_ctx):

    cdef Loop loop

    if UVLOOP_DEBUG:
        if handle.loop is NULL:
            raise RuntimeError(
                'handle.loop is NULL in __ensure_handle_data')

        if handle.loop.data is NULL:
            raise RuntimeError(
                'handle.loop.data is NULL in __ensure_handle_data')

    if handle.data is NULL:
        loop = <Loop>handle.loop.data
        loop.call_exception_handler({
            'message': '{} called with handle.data == NULL'.format(
                handle_ctx.decode('latin-1'))
        })
        return 0

    if handle.data is NULL:
        # The underlying UVHandle object was GCed with an open uv_handle_t.
        loop = <Loop>handle.loop.data
        loop.call_exception_handler({
            'message': '{} called after destroying the UVHandle'.format(
                handle_ctx.decode('latin-1'))
        })
        return 0

    return 1


cdef void __uv_close_handle_cb(uv.uv_handle_t* handle) with gil:
    cdef UVHandle h

    if handle.data is NULL:
        # The original UVHandle is long dead. Just free the mem of
        # the uv_handle_t* handler.

        if UVLOOP_DEBUG:
            if handle.loop == NULL or handle.loop.data == NULL:
                raise RuntimeError(
                    '__uv_close_handle_cb: handle.loop is invalid')
            (<Loop>handle.loop.data)._debug_uv_handles_freed += 1

        PyMem_RawFree(handle)
    else:
        h = <UVHandle>handle.data
        if UVLOOP_DEBUG:
            h._loop._debug_handles_closed.update([
                h.__class__.__name__])
        h._free()
        Py_DECREF(h) # Was INCREFed in UVHandle._close


cdef void __close_all_handles(Loop loop):
    uv.uv_walk(loop.uvloop, __uv_walk_close_all_handles_cb, <void*>loop) # void

cdef void __uv_walk_close_all_handles_cb(uv.uv_handle_t* handle, void* arg) with gil:
    cdef:
        Loop loop = <Loop>arg
        UVHandle h

    if uv.uv_is_closing(handle):
        # The handle is closed or is closing.
        return

    if handle.data is NULL:
        # This shouldn't happen. Ever.
        loop.call_exception_handler({
            'message': 'handle.data is NULL in __close_all_handles_cb'
        })
        return

    h = <UVHandle>handle.data
    if not h._closed:
        h._warn_unclosed()
        h._close()
