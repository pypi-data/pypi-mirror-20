#!/usr/bin/env python

from distutils.core import setup

setup(name='django-smart-lists',
      version='1.0.6',
      description='Easy lists for django views',
      author='Kristian Oellegaard',
      author_email='kristian@kristian.io',
      url='https://github.com/plecto/django-smart-lists',
      include_package_data = True,
      packages=['smart_lists', 'smart_lists.templatetags'],
      package_data = {'package' : 'smart_lists/templates/smart_lists/*' },
)
