"""
Build microservices with Python
"""

from gemstone.core.microservice import MicroService
from gemstone.core.decorators import private_api_method, public_method, event_handler, \
    requires_handler_reference, async_method
from gemstone.core.handlers import TornadoJsonRpcHandler, GemstoneCustomHandler
from gemstone.client.remote_service import RemoteService

from gemstone.util import as_completed, first_completed, make_callbacks

__author__ = "Vlad Calin"
__email__ = "vlad.s.calin@gmail.com"

__version__ = "0.8.0"

__all__ = [
    # core classes
    'MicroService',
    'RemoteService',

    # decorators
    'public_method',
    'private_api_method',
    'event_handler',
    'requires_handler_reference',

    # tornado handler
    'TornadoJsonRpcHandler',
    'GemstoneCustomHandler',

    # async utilities
    'as_completed',
    'first_completed',
    'make_callbacks'
]
