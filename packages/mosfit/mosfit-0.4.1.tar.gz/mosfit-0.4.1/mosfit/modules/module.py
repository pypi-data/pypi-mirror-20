"""Definitions for the ``Module`` class."""
import json
from collections import OrderedDict

from mosfit.printer import Printer


class Module(object):
    """Base ``Module`` class."""

    def __init__(self, name, pool, printer=None, **kwargs):
        """Initialize module.

        This is where expensive calculations that only need to be evaluated
        once should be located.
        """
        self._name = name
        self._log = False
        self._pool = pool
        self._preprocessed = False
        if not printer:
            self._printer = Printer()
        else:
            self._printer = printer

    def __repr__(self):
        """Return a string representation of self."""
        return json.dumps(self.__dict__)

    def process(self, **kwargs):
        """Process module, should always return a dictionary."""
        return OrderedDict()

    def reset_preprocessed(self):
        """Reset preprocessed flag."""
        self._preprocessed = False

    def send_request(self, request):
        """Send a request."""
        return []

    def name(self):
        """Return own name."""
        return self._name

    def receive_requests(self, **requests):
        """Receive requests from other ``Module`` objects."""
        pass

    def set_event_name(self, event_name):
        """Set the name of the event being modeled."""
        self._event_name = event_name

    def get_bibcode(self):
        """Return any bibcodes associated with the present ``Module``."""
        return []
