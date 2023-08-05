"""
Asphalt wrappers for Kyoukai.
"""
import asyncio
import socket
import ssl
from functools import partial

import logging
from asphalt.core import resolve_reference, Context
from asphalt.core.event import Signal, Event
from asphalt.core.component import Component
from werkzeug.wrappers import Request, Response

from kyoukai.blueprint import Blueprint
from kyoukai.route import Route


# Asphalt events.
class ConnectionMadeEvent(Event):  # pragma: no cover
    """
    Dispatched when a connection is made to the server.

    This does NOT fire when using WSGI workers.

    This has the protocol as the ``protocol`` attribute.
    """

    def __init__(self, source, topic, *, protocol):
        super().__init__(source, topic)
        self.protocol = protocol


class ConnectionLostEvent(ConnectionMadeEvent):  # pragma: no cover
    """
    Dispatched when a connection is lost from the server.

    This does NOT fire when using WSGI workers.

    This has the protocol as the ``protocol`` attribute.
    """


class CtxEvent(Event):  # pragma: no cover
    def __init__(self, source, topic, *, ctx: 'HTTPRequestContext'):
        super().__init__(source, topic)
        self.ctx = ctx


class RouteMatchedEvent(CtxEvent):  # pragma: no cover
    """
    Dispatched when a route is matched.

    This has the context as the ``ctx`` attribute, and the route can be accessed via ``ctx.route``.
    """


class RouteInvokedEvent(CtxEvent):  # pragma: no cover
    """
    Dispatched when a route is invoked.

    This has the context as the ``ctx`` attribute.
    """


class RouteReturnedEvent(CtxEvent):  # pragma: no cover
    """
    Dispatched after a route has returned.

    This has the context as the ``ctx`` attribute and the response as the ``result`` attribute.
    """

    def __init__(self, source, topic, *, ctx, result: Response):
        super().__init__(source, topic, ctx=ctx)
        self.result = result


class KyoukaiBaseComponent(Component):  # pragma: no cover
    """
    The base class for any component used by Kyoukai.

    This one does not create a Server instance; it should be used when you are using a different HTTP server backend.
    """
    connection_made = Signal(ConnectionMadeEvent)
    connection_lost = Signal(ConnectionLostEvent)

    def __init__(self, app, ip: str = "127.0.0.1", port: int = 4444, **cfg):
        from kyoukai.app import Kyoukai
        if not isinstance(app, Kyoukai):
            app = resolve_reference(app)

        self.app = app
        self.ip = ip
        self.port = port

        self.cfg = cfg

        self.server = None
        self.base_context = None  # type: Context

        self.logger = logging.getLogger("Kyoukai")

        self._server_name = app.server_name or socket.getfqdn()

    async def start(self, ctx: Context):
        pass


class KyoukaiComponent(KyoukaiBaseComponent):  # pragma: no cover
    """
    A component for Kyoukai.

    This will load and run the application, if applicable.
    """
    connection_made = Signal(ConnectionMadeEvent)
    connection_lost = Signal(ConnectionLostEvent)

    def __init__(self, app, ip: str = "127.0.0.1", port: int = 4444,
                 **cfg):
        """
        Creates a new component.

        :param app: The application object to use.
            This can either be the real application object, or a string that resolves to a reference for the real
            application object.

        :param ip: If using the built-in HTTP server, the IP to bind to.
        :param port: If using the built-in HTTP server, the port to bind to.
        :param cfg: Additional configuration.
        """
        super().__init__(app, ip, port, **cfg)

        self.app.config.update(self.cfg)

        for key, value in cfg.items():
            setattr(self, key, value)

    def get_server_name(self):
        """
        :return: The server name of this app.
        """
        return self.app.server_name or self._server_name

    def get_protocol(self, ctx: Context, serv_info: tuple):
        from kyoukai.backends.httptools_ import KyoukaiProtocol
        return KyoukaiProtocol(self, ctx, *serv_info)

    async def start(self, ctx: Context):
        """
        Starts the webserver if required.

        :param ctx: The base context.
        """
        self.base_context = ctx

        if self.cfg.get("use_builtin_webserver", True):
            if self.cfg.get("ssl", False):
                ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
                ssl_context.load_cert_chain(certfile=self.ssl_certfile, keyfile=self.ssl_keyfile)
                self.logger.info("Using HTTP over TLS.")
            else:
                ssl_context = None

            protocol = partial(self.get_protocol, ctx, (self._server_name, self.port))
            self.app.finalize()
            self.server = await asyncio.get_event_loop().create_server(protocol, self.ip, self.port, ssl=ssl_context)
            self.logger.info("Kyoukai serving on {}:{}.".format(self.ip, self.port))


class HTTPRequestContext(Context):
    """
    The context subclass passed to all requests within Kyoukai.
    """
    route_matched = Signal(RouteMatchedEvent)
    route_invoked = Signal(RouteInvokedEvent)
    route_completed = Signal(RouteReturnedEvent)

    def __init__(self, parent: Context, request: Request):
        super().__init__(parent)

        self.app = None  # type: Kyoukai

        self.request = request

        # Route objects and Blueprint objects.
        self.route = None  # type: Route
        self.bp = None  # type: Blueprint

        # The WSGI environment for this request.
        self.environ = self.request.environ  # type: dict

    def url_for(self, endpoint: str, *, method: str, **kwargs):
        """
        A context-local version of ``url_for``.

        For more information, see the documentation on :meth:`kyoukai.blueprint.Blueprint.url_for`.
        """
        return self.app.url_for(self.environ, endpoint, method=method, **kwargs)
