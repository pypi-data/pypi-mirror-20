import logging

from ea.blocks.router.exc import UnknownField
from ea.blocks.router.exc import InvalidComparison


class Router(object):
    """Determines to which channels events are to be
    routed.
    """
    logger = logging.getLogger('events.router')

    def __init__(self, rules, always_route=None, sink=None):
        self.rules = rules
        self.always_route = set(always_route or [])
        self.sink = sink

    def get_possible_routes(self):
        """Return a set containing all possible routes for the current
        configuration.
        """
        routes = set()
        for rule in self.rules:
            routes |= set(rule.destinations)

        if self.sink:
            routes.add(self.sink)

        if self.always_route:
            routes |= self.always_route

        return routes

    def route(self, dto):
        """Matches the event contained in the Data Transfer Object
        (DTO) and returns a tuple of destinations that it should
        be forwared to.
        """
        routes = set()
        exclude = set()
        for rule in self.rules:
            try:
                if not rule.match(dto):
                    continue

            # If an exception occurs, no further rules are
            # processed and the event is sent to the sink.
            except (InvalidComparison, UnknownField) as e:
                self.logger.critical(
                    "Invalid rule spec led to exception: %s",
                    repr(e)
                )
                routes = set()
                break
            except Exception as e:
                self.logger.exception("Fatal exception during event routing.")
                routes = set()
                break

            dest, excl = rule.get_destinations()
            routes |= set(dest)
            exclude |= excl

        # If matching was succesful, the event may also be forwarded
        # to the channels that were specified to always route to.
        if routes:
            routes |= self.always_route

        # Else, the event is sent to the sink.
        if not routes and self.sink:
            routes |= set([self.sink])

        return routes ^ exclude
