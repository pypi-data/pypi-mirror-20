import unittest

from django.test import TestCase

from fobi.dynamic import assemble_form_class

from .base import print_info
from .helpers import (
    setup_fobi,
    get_or_create_admin_user,
    create_form_with_entries
)

__title__ = 'fobi.tests.test_dynamic_forms'
__author__ = 'Artur Barseghyan <artur.barseghyan@gmail.com>'
__copyright__ = '2014-2017 Artur Barseghyan'
__license__ = 'GPL 2.0/LGPL 2.1'
__all__ = ('FobiDynamicFormsTest',)


class FobiDynamicFormsTest(TestCase):
    """Tests of django-fob dynamic forms functionality."""

    def setUp(self):
        """Set up."""
        setup_fobi(fobi_sync_plugins=True)
        user = get_or_create_admin_user()
        create_form_with_entries(user)

    @print_info
    def test_01_assemble_form_class_and_render_form(self):
        """Test form class assembling and rendering."""
        flow = []

        # Getting entry with created plugins
        form_entry = create_form_with_entries()
        flow.append(form_entry)

        FormClass = assemble_form_class(form_entry)
        flow.append(FormClass)

        form = FormClass()
        flow.append(form)

        rendered_form = form.as_p()
        flow.append(rendered_form)

        return flow


if __name__ == '__main__':
    unittest.main()
