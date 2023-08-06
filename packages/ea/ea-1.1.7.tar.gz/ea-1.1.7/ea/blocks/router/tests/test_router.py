import unittest

from ea.blocks.router.schema import RuleSchema
from ea.blocks.router.base import Router


class RouterTestCase(unittest.TestCase):
    rules = [
        {
            "rts": True,
            "destinations": ["foo","bar"],
            "exclude": ["baz"],
            "criterions": [
                {
                    "name": "header.publisher",
                    "operator": "EQ",
                    "value": "csb"
                }
            ]
        },
        {
            "rts": False,
            "destinations": ["taz"],
            "criterions": [
                {
                    "name": "header.publisher",
                    "operator": "EQ",
                    "value": "csb"
                }
            ]
        }
    ]


    dto = {
        "header": {
            "publisher": "csb"
        }
    }

    def setUp(self):
        rules, errors = RuleSchema(many=True).load(self.rules)
        assert not errors, repr(errors)
        self.router = Router(
            rules,
            always_route=["baz","taz"],
            sink="sink"
        )

    def test_get_possible_routes(self):
        routes = self.router.get_possible_routes()
        self.assertEqual(routes, set(["foo","bar","baz","taz","sink"]))

    def test_get_possible_routes_without_sink(self):
        self.router.sink = None
        routes = self.router.get_possible_routes()
        self.assertEqual(routes, set(["foo","bar","baz","taz"]))

    def test_get_possible_routes_without_always_route(self):
        self.router.always_route = set()
        routes = self.router.get_possible_routes()
        self.assertEqual(routes, set(["foo","bar","taz","sink"]))

    def test_event_gets_not_forwarded_to_excluded(self):
        routes = self.router.route(self.dto)
        self.assertNotIn('baz', routes)
        self.assertIn('taz', routes)
        self.assertIn('bar', routes)
        self.assertIn('foo', routes)
        self.assertEqual(len(routes), 3)

    def test_unmatched_event_returns_sink(self):
        routes = self.router.route({
            'header': {
                'publisher': 'foo'
            }
        })
        self.assertIn('sink', routes)
        self.assertEqual(len(routes), 1)

    def test_missing_attribute_returns_sink(self):
        routes = self.router.route({})
        self.assertIn('sink', routes)
        self.assertEqual(len(routes), 1)

    def test_fatal_exception_returns_sink(self):
        routes = self.router.route({
            'header': {
                'publisher': RaisesOnEqualityComparison()
            }
        })
        self.assertIn('sink', routes)
        self.assertEqual(len(routes), 1)


class RaisesOnEqualityComparison(object):

    def __eq__(self, other):
        raise Exception
