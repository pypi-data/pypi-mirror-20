"""
The session manages the mechanics of receiving and sending data over
the websocket.

"""

from __future__ import print_function
from __future__ import unicode_literals

import logging
import select
import socket
import ssl
import threading
import time

import six

from .frame import Frame
from . import errors
from . import events


log = logging.getLogger('ws')



class WebsocketSession(object):
    """Manages the mechanics of running the websocket."""

    def __init__(self, websocket):
        self.websocket = websocket

        self._address = (websocket.host, websocket.port)
        self._lock = threading.Lock()

        self._sock = None
        self._poll_start = time.time()
        self._last_ping = time.time()

    def __repr__(self):
        return "<ws-session '{}'>".format(self.url)

    @property
    def url(self):
        return self.websocket.url

    def write(self, data):
        """Send raw data."""
        if self.websocket.is_closed or self._sock is None:
            raise errors.WebSocketClosed('data not sent')

        with self._lock:
            try:
                self._sock.sendall(data)
            except socket.error as error:
                raise errors.TransportFail(
                    six.text_type(error)
                )

    def send(self, opcode, data):
        """Send a WS Frame."""
        frame = Frame(opcode, payload=data)
        log.debug('send %r', frame)
        self.write(frame.to_bytes())

    class _SocketFail(Exception):
        pass

    @classmethod
    def _socket_fail(cls, msg, *args, **kwargs):
        raise cls._SocketFail(msg.format(*args, **kwargs))

    def _select(self, sock, poll):
        try:
            reads, _, errors = select.select([sock], [], [sock], poll)
        except select.error as error:
            self._socket_fail("select error; {}", error)
        return reads, errors

    def _connect(self):
        sock = socket.socket(
            socket.AF_INET, socket.SOCK_STREAM
        )
        sock.settimeout(30)
        if self.websocket.is_secure:
            sock = ssl.wrap_socket(sock)
        sock.connect(self._address)
        return sock

    def _close_socket(self):
        try:
            # Get the write lock, so we can be certain data sending
            # in another thread is sent.
            with self._lock:
                self._sock.shutdown(socket.SHUT_RDWR)
                self._sock.close()
        except socket.error:
            # Socket is already closed.
            # That's fine, just a no-op.
            pass
        except Exception as error:
            # Paranoia
            log.warn('error closing socket')
        finally:
            self._sock = None

    def _send_request(self):
        request_bytes = self.websocket.get_request()
        self.write(request_bytes)

    def _check_poll(self, poll):
        current_time = time.time()
        if current_time - self._poll_start >= poll:
            self._poll_start = current_time
            return True
        else:
            return False

    def _check_auto_ping(self, ping_rate):
        if ping_rate:
            current_time = time.time()
            if current_time - self._last_ping >= ping_rate:
                self._last_ping = current_time
                self.websocket.send_ping()

    def _recv(self, count):
        try:
            if self.websocket.is_secure:
                recv_bytes = []
                while count:
                    data = self._sock.recv(count)
                    recv_bytes.append(data)
                    count = self._sock.pending()
                return b''.join(recv_bytes)
            else:
                return self._sock.recv(count)
        except socket.error as error:
            self._socket_fail('recv fail; {}', error)

    def _feed(self, data, poll, ping_rate):
        """Feed the websocket, yielding events."""
        # Also emits poll events and sends pings
        for event in self.websocket.feed(data):
            yield event
            if self._check_poll(poll):
                yield events.Poll()
            self._check_auto_ping(ping_rate)

    def run(self, poll=5, ping_rate=30):
        # TODO: implement exponential back off
        websocket = self.websocket
        url = websocket.url
        # Connecting event
        yield events.Connecting(url)

        # Create socket and connect to remote server
        try:
            sock = self._sock = self._connect()
        except socket.error as error:
            yield events.ConnectFail('{}'.format(error))
            return
        except Exception as error:
            log.error('error connecting to %s; %s', url, error)
            yield events.ConnectFail('error; {}'.format(error))
            return

        # We now have a socket.
        # Send the request.
        try:
            self._send_request()
        except errors.TransportFail as error:
            self._close_socket()
            yield events.ConnectFail('request failed; {}'.format(error))
            return
        except Exception as error:
            self._close_socket()
            log.error('error sending request; %s', error)
            yield events.ConnectFail('request error; {}'.format(error))
            return

        # Connected to the server, but not yet upgraded to websockets
        yield events.Connected(url)
        self._poll_start = time.time()

        try:
            while not websocket.is_closed:
                reads, errors = self._select(sock, poll)
                if reads:
                    data = self._recv(4096)
                    if not data:
                        self._socket_fail('connection lost')
                    for event in self._feed(data, poll, ping_rate):
                        yield event
                if errors:
                    self._socket_fail('socket error')
                    break
        except self._SocketFail as error:
            # Session methods will translate socket errors to this
            # exception. The result is we are disconnected.
            self._close_socket()
            yield events.Disconnected('socket fail; {}'.format(error))
        except Exception as error:
            # It pays to be paranoid.
            log.exception('error in websocket loop')
            self._close_socket()
            yield events.Disconnected('error; {}'.format(error))
        else:
            # websocket instance terminate the loop, which means
            # it was a graceful exit.
            self._close_socket()
            yield events.Disconnected(graceful=True)


if __name__ == "__main__":

    # Test with wstest -m echoserver -w ws://127.0.0.1:9001 -d
    # Get wstest app from http://autobahn.ws/testsuite/

    from .websocket import WebSocket

    #ws = WebSocket('wss://echo.websocket.org')
    ws = WebSocket('ws://127.0.0.1:9001/')
    for event in ws.connect(poll=5):
        print(event)
        if isinstance(event, events.Poll):
            ws.send_text('Hello, World')
            ws.send_binary(b'hello world in binary')

