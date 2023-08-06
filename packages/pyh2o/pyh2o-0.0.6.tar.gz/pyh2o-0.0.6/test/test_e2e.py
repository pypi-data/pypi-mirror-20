import h2o
import os
import socket
import threading
import unittest
from six.moves import urllib
from websocket import create_connection

SIMPLE_PATH = b'/simple'
SIMPLE_BODY = b'<h1>It works!</h1>'
PEERNAME_PATH = b'/peername'
HEADER_PATH = b'/header'
HEADER_NAME = b'X-My-Header'
HEADER_VALUE = b'Hello world!'
RES_HEADER_PATH = b'/res_header'
STREAM_PATH = b'/stream'
STREAM_BODIES = [b'<h1>', b'Stream', b'</h1>']
WEBSOCKET_PATH = b'/websocket'
WEBSOCKET_MESSAGE = b'hello'
STATIC_PATH = b'/static'


class SimpleHandler(h2o.Handler):
    def on_req(self):
        self.res_status = 200
        self.send_inline(SIMPLE_BODY)
        return 0


class PeernameHandler(h2o.Handler):
    def on_req(self):
        self.res_status = 200
        peername = self.peername
        self.send_inline(peername[0] + b':' + str(peername[1]).encode())
        return 0


class HeaderHandler(h2o.Handler):
    def on_req(self):
        assert dict(self.headers())[HEADER_NAME.lower()] == HEADER_VALUE
        assert next(self.find_headers(HEADER_NAME.lower())) == HEADER_VALUE
        self.res_status = 200
        self.send_inline(b'')
        return 0


class ResHeaderHandler(h2o.Handler):
    def on_req(self):
        self.res_add_header(HEADER_NAME, HEADER_VALUE)
        self.res_status = 200
        self.send_inline(b'')
        return 0


class StreamHandler(h2o.StreamHandler):
    def on_req(self):
        self.iterator = iter(STREAM_BODIES)
        self.res_status = 200
        self.start_response()
        self.on_proceed()
        return 0

    def on_proceed(self):
        try:
            self.send([next(self.iterator)], h2o.H2O_SEND_STATE_IN_PROGRESS)
        except StopIteration:
            self.send([], h2o.H2O_SEND_STATE_FINAL)


class WebsocketHandler(h2o.WebsocketHandler):
    def on_message(self, opcode, msg):
        self.send(opcode, msg)


class E2eTest(unittest.TestCase):
    def setUp(self):
        config = h2o.Config()
        host = config.add_host(b'default', 65535)
        host.add_path(SIMPLE_PATH).add_handler(SimpleHandler)
        host.add_path(PEERNAME_PATH).add_handler(PeernameHandler)
        host.add_path(HEADER_PATH).add_handler(HeaderHandler)
        host.add_path(RES_HEADER_PATH).add_handler(ResHeaderHandler)
        host.add_path(STREAM_PATH).add_handler(StreamHandler)
        host.add_path(WEBSOCKET_PATH).add_handler(WebsocketHandler)
        host.add_path(STATIC_PATH).add_static(os.path.dirname(__file__).encode())

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
        self.sock.bind(('127.0.0.1', 0))
        self.sock.listen(0)

        self.loop = h2o.Loop()
        self.loop.start_accept(self.sock.fileno(), config)
        thread = threading.Thread(target=self.run_loop)
        thread.daemon = True
        thread.start()

    def run_loop(self):
        while self.loop.run() == 0:
            pass

    def format_path(self, scheme, path):
        return '{0}://127.0.0.1:{1}{2}'.format(
            scheme, self.sock.getsockname()[1], path.decode())

    def http_get(self, path, headers={}):
        return urllib.request.urlopen(urllib.request.Request(
            self.format_path('http', path), headers=headers))

    def ws_connect(self, path):
        return create_connection(self.format_path('ws', path))

    def test_simple(self):
        response = self.http_get(SIMPLE_PATH)
        self.assertEqual(response.read(), SIMPLE_BODY)

    def test_peername(self):
        response = self.http_get(PEERNAME_PATH)
        sock = socket.fromfd(response.fileno(), socket.AF_INET, socket.SOCK_STREAM)
        sockname = sock.getsockname()
        self.assertEqual(response.read(),
                         (sockname[0] + ':' + str(sockname[1])).encode())
        sock.close()

    def test_header(self):
        self.http_get(HEADER_PATH, {HEADER_NAME: HEADER_VALUE})

    def test_res_handler(self):
        response = self.http_get(RES_HEADER_PATH)
        self.assertEqual(response.info()[HEADER_NAME.decode()],
                         HEADER_VALUE.decode())

    def test_stream(self):
        response = self.http_get(STREAM_PATH)
        self.assertEqual(response.read(), b''.join(STREAM_BODIES))

    def test_websocket(self):
        ws = self.ws_connect(WEBSOCKET_PATH)
        ws.send_binary(WEBSOCKET_MESSAGE)
        self.assertEqual(ws.recv(), WEBSOCKET_MESSAGE)

    def test_static(self):
        response = self.http_get(STATIC_PATH + b'/' + os.path.basename(__file__).encode())
        with open(__file__, 'rb') as f:
            self.assertEqual(response.read(), f.read())

if __name__ == '__main__':
    unittest.main()
