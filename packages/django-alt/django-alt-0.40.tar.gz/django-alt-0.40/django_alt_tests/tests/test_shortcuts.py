from unittest import TestCase

from django_alt.utils.shortcuts import make_error, validation_error_class, invalid, invalid_if, coal


class UtilsShortcutsTests(TestCase):
    def test_make_error(self):
        self.assertEqual(make_error('k', 'v'), {'k': ['v.']})
        self.assertEqual(make_error('k', 'v.'), {'k': ['v.']})
        self.assertEqual(make_error(['k'], 'v'), {'k': ['v.']})
        self.assertEqual(make_error(['k'], ['v']), {'k': ['v.']})
        self.assertEqual(make_error(['k1', 'k2'], ['v']), {'k1': ['v.'], 'k2': ['v.']})
        self.assertEqual(make_error(['k1', 'k2'], ['v1', 'v2']), {'k1': ['v1.', 'v2.'], 'k2': ['v1.', 'v2.']})
        self.assertEqual(make_error(None, 'v1'), {'non_field_errors': ['v1.']})

    def test_invalid(self):
        with self.assertRaises(validation_error_class) as ex:
            invalid('k', 'v')
        self.assertEqual(ex.exception.detail, {'k': ['v.']})

    def test_invalid_if(self):
        invalid_if(False, 'k', 'v')
        with self.assertRaises(validation_error_class) as ex:
            invalid_if(True, 'k', 'v')
        self.assertEqual(ex.exception.detail, {'k': ['v.']})

    def test_coal(self):
        self.assertDictEqual(coal(None, {}), {})
        self.assertDictEqual(coal(None, {'a': 5}), {'a': 5})
        self.assertEqual(coal(1, {'a': 5}), 1)
        self.assertEqual(coal(False, {'a': 5}), False)
        self.assertEqual(coal(False, None), False)
        self.assertEqual(coal(None, False), False)
        self.assertEqual(coal(None, None), None)
