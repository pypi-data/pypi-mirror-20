from cpython cimport Py_INCREF, Py_DECREF
from libc.stdint cimport uint16_t, intptr_t, INT32_MAX, SIZE_MAX
cimport ch2o


cdef class Config:
    cdef ch2o.h2o_globalconf_t conf

    def __cinit__(self):
        ch2o.h2o_config_init(&self.conf)

    def __dealloc__(self):
        ch2o.h2o_config_dispose(&self.conf)

    def add_host(self, bytes host, uint16_t port):
        hostconf = ch2o.h2o_config_register_host(
            &self.conf, ch2o.h2o_iovec_init(<char*>host, len(host)), port)
        result = Host()
        result.config = self
        result.hostconf = hostconf
        return result


cdef class Host:
    cdef Config config  # keeps reference for hostconf
    cdef ch2o.h2o_hostconf_t* hostconf

    def add_path(self, bytes path, int flags=0):
        pathconf = ch2o.h2o_config_register_path(self.hostconf, path, flags)
        result = Path()
        result.config = self.config
        result.pathconf = pathconf
        return result


ctypedef struct pyh2o_handler_t:
    ch2o.h2o_handler_t base
    void* data


H2O_FILE_FLAG_NO_ETAG = 0x1
H2O_FILE_FLAG_DIR_LISTING = 0x2
H2O_FILE_FLAG_SEND_COMPRESSED = 0x4


cdef class Path:
    cdef Config config  # keeps reference for pathconf
    cdef ch2o.h2o_pathconf_t* pathconf

    def add_handler(self, type handler_type):
        handler = <pyh2o_handler_t*>ch2o.h2o_create_handler(
            self.pathconf, sizeof(pyh2o_handler_t))
        handler.base.on_req = _handler_on_req
        handler.data = <void*>handler_type

    def add_static(self, bytes real_path, int flags=0):
        ch2o.h2o_file_register(self.pathconf, real_path, NULL, NULL, flags)


cdef int _handler_on_req(ch2o.h2o_handler_t* self, ch2o.h2o_req_t* req) nogil:
    data = (<pyh2o_handler_t*>self).data
    with gil:
        handler = <Handler>(<object>data)()
        handler.req = req
        return handler.on_req()


cdef class Handler:
    cdef ch2o.h2o_req_t* req
    cdef list buffer_refs  # keeps reference for pending I/O

    def __cinit__(self):
        self.buffer_refs = list()

    def on_req(self):
        pass

    @property
    def peername(self):
        cdef ch2o.sockaddr_storage sa
        salen = self.req.conn.callbacks.get_peername(self.req.conn, <ch2o.sockaddr*>&sa)
        if salen == 0:
            return None
        cdef char buf[ch2o.NI_MAXHOST]
        if ch2o.h2o_socket_getnumerichost(<ch2o.sockaddr*>&sa, salen, buf) == SIZE_MAX:
            return None
        port = ch2o.h2o_socket_getport(<ch2o.sockaddr*>&sa)
        if port == -1:
            return None
        return buf, port

    @property
    def authority(self):
        return _iovec_to_bytes(&self.req.authority)

    @property
    def method(self):
        return _iovec_to_bytes(&self.req.method)

    @property
    def path(self):
        return _iovec_to_bytes(&self.req.path)

    @property
    def version(self):
        return self.req.version

    def headers(self):
        headers = &self.req.headers
        for index in range(headers.size):
            header = headers.entries[index]
            yield _iovec_to_bytes(header.name), _iovec_to_bytes(&header.value)

    def find_headers(self, bytes name):
        headers = &self.req.headers
        index = SIZE_MAX
        while True:
            index = ch2o.h2o_find_header_by_str(headers, name, len(name), index)
            if index == SIZE_MAX:
                break
            header = headers.entries[index]
            yield _iovec_to_bytes(&header.value)

    def res_add_header(self, bytes name, bytes value):
        self.buffer_refs.append(name)
        self.buffer_refs.append(value)
        ch2o.h2o_add_header_by_str(&self.req.pool, &self.req.res.headers,
                                   name, len(name), 1, value, len(value))

    property res_status:
        def __get__(self):
            return self.req.res.status

        def __set__(self, int value):
            self.req.res.status = value

    def send_inline(self, bytes body):
        ch2o.h2o_send_inline(self.req, body, len(body))


cdef inline bytes _iovec_to_bytes(ch2o.h2o_iovec_t* iovec):
    return iovec.base[:iovec.len]


H2O_SEND_STATE_IN_PROGRESS = 0
H2O_SEND_STATE_FINAL = 1
H2O_SEND_STATE_ERROR = 2


ctypedef struct pyh2o_generator_t:
    ch2o.h2o_generator_t base
    void* data


cdef class StreamHandler(Handler):
    def on_proceed(self):
        pass

    def on_stop(self):
        pass

    def start_response(self):
        generator = <pyh2o_generator_t*>ch2o.h2o_mem_alloc_shared(
            &self.req.pool, sizeof(pyh2o_generator_t), _generator_on_dispose)
        generator.base.proceed = _generator_on_proceed
        generator.base.stop = _generator_on_stop
        Py_INCREF(self)
        generator.data = <void*>self
        ch2o.h2o_start_response(self.req, &generator.base)

    def send(self, bodies, int send_state):
        bufcnt = len(bodies)
        cdef ch2o.h2o_iovec_t* bufs = (
            <ch2o.h2o_iovec_t*>ch2o.alloca(bufcnt * sizeof(ch2o.h2o_iovec_t)))
        for i in range(bufcnt):
            body = bodies[i]
            bufs[i].base = body
            bufs[i].len = len(body)
            self.buffer_refs.append(body)
        ch2o.h2o_send(self.req, bufs, bufcnt, send_state)


cdef void _generator_on_proceed(ch2o.h2o_generator_t* self,
                                ch2o.h2o_req_t* req) nogil:
    generator = <pyh2o_generator_t*>self
    with gil:
        handler = <StreamHandler>(generator.data)
        del handler.buffer_refs[:]
        handler.on_proceed()


cdef void _generator_on_stop(ch2o.h2o_generator_t* self,
                             ch2o.h2o_req_t* req) nogil:
    generator = <pyh2o_generator_t*>self
    with gil:
        (<StreamHandler>(generator.data)).on_stop()


cdef void _generator_on_dispose(void* self) nogil:
    generator = <pyh2o_generator_t*>self
    with gil:
        Py_DECREF(<StreamHandler>generator.data)


cdef class WebsocketHandler(Handler):
    cdef ch2o.h2o_websocket_conn_t* conn

    def on_req(self):
        cdef const char* client_key
        if (ch2o.h2o_is_websocket_handshake(self.req, &client_key) != 0 or
            client_key == NULL):
            return -1
        ch2o.h2o_upgrade_to_websocket(self.req, client_key, <void*>self,
                                      _websocket_handler_on_message)
        Py_INCREF(self)
        return 0

    def on_message(self, message):
        pass

    def send(self, int opcode, bytes msg):
        cdef ch2o.wslay_event_msg msgarg
        msgarg.opcode = opcode
        msgarg.msg = msg
        msgarg.msg_length = len(msg)
        ch2o.wslay_event_queue_msg(self.conn.ws_ctx, &msgarg)


cdef void _websocket_handler_on_message(
    ch2o.h2o_websocket_conn_t* conn,
    const ch2o.wslay_event_on_msg_recv_arg* arg) nogil:
    with gil:
        handler = <WebsocketHandler>conn.data
        if arg == NULL:
            ch2o.h2o_websocket_close(conn)
            Py_DECREF(handler)
            return
        handler.conn = conn
        handler.on_message(arg.opcode, arg.msg[:arg.msg_length])


H2O_SOCKET_FLAG_DONT_READ = 0x20


cdef class Loop:
    cdef ch2o.h2o_loop_t* loop

    def __cinit__(self):
        self.loop = ch2o.h2o_evloop_create()

    def __dealloc__(self):
        pass  # FIXME(iceboy): leak

    def start_accept(self, int sockfd, Config config,
                     int flags=H2O_SOCKET_FLAG_DONT_READ):
        sock = ch2o.h2o_evloop_socket_create(self.loop, sockfd, flags)
        accept_context = _AcceptContext()
        accept_context.config = config
        ch2o.h2o_context_init(&accept_context.context, self.loop, &config.conf)
        accept_context.accept_ctx.ctx = &accept_context.context
        accept_context.accept_ctx.hosts = config.conf.hosts
        Py_INCREF(accept_context)
        sock.data = <void*>accept_context
        ch2o.h2o_socket_read_start(sock, _socket_on_read)
        # FIXME(iceboy): leak

    def run(self):
        cdef ch2o.h2o_loop_t* loop = self.loop
        with nogil:
            result = ch2o.h2o_evloop_run(loop, INT32_MAX)
        return result


cdef class _AcceptContext:
    cdef Config config  # keeps reference for context and accept_ctx
    cdef ch2o.h2o_context_t context
    cdef ch2o.h2o_accept_ctx_t accept_ctx


cdef void _socket_on_read(ch2o.h2o_socket_t* sock, const char* err):
    if err:
        return  # TODO(iceboy): error handling.
    accept_sock = ch2o.h2o_evloop_socket_accept(sock)
    if not accept_sock:
        return  # TODO(iceboy): ???
    ch2o.h2o_accept(&(<_AcceptContext>sock.data).accept_ctx, accept_sock)
