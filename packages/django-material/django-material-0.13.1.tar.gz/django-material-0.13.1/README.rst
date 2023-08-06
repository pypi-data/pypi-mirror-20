===============
Django Material
===============

Material design for Django Forms and Admin. Template driven.

.. image:: https://img.shields.io/pypi/v/django-material.svg
    :target: https://pypi.python.org/pypi/django-material
.. image:: https://img.shields.io/pypi/wheel/django-material.svg
    :target: https://pypi.python.org/pypi/django-material
.. image:: https://img.shields.io/pypi/status/django-material.svg
    :target: https://pypi.python.org/pypi/django-material
.. image:: https://travis-ci.org/viewflow/django-material.svg
    :target: https://travis-ci.org/viewflow/django-material
.. image:: https://img.shields.io/pypi/pyversions/django-material.svg
    :target: https://pypi.python.org/pypi/django-material
.. image:: https://img.shields.io/pypi/l/Django.svg
    :target: https://raw.githubusercontent.com/viewflow/django-material/master/LICENSE.txt
.. image:: https://badges.gitter.im/Join%20Chat.svg
   :alt: Join the chat at https://gitter.im/viewflow/django-material
   :target: https://gitter.im/viewflow/django-material?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

Django-Material works with Django 1.8/1.9/1.10

Tested with:

.. image:: demo/static/img/browserstack_small.png
  :target:  http://browserstack.com/

Overview
========

- Forms_ - New way to render django forms

  * Strong python/html code separation
  * Easy redefinition of particular fields rendering
  * Complex form layout support

- Frontend_ - Quick starter template for modular applications development

- Admin_ - Material-designed django admin

Demo: http://forms.viewflow.io/

.. image:: .screen.png
   :width: 400px

Documentation
=============

http://docs.viewflow.io/material_forms.html

License
=======

Django Material is an Open Source project licensed under the terms of the `BSD3 license <https://github.com/viewflow/django-material/blob/master/LICENSE.txt>`_

Django Material Pro has a commercial-friendly license and distributed as part of Viewflow Pro


Changelog
=========

0.13.0 2017-03-16 - Beta
------------------------

- Forms - Update MaterializeCSS to 0.98.0
- Forms - `model autocomplete <http://docs.viewflow.io/forms_widgets.html>`_ widgets added (PRO)
- Frontend - Fix viewset customization for update view form.
- Frontend - Fix permission validation to add items in detail template
- Frontend - Icons for boolean variables in the list view
- Frontend - Destroy select and toast to fix issue with turbolinks cache
- Frontend - Allow using non-object level permission in the frontend
- Frontend - Allow specifying custom form widgets in the viewset
- Frontend - Redirect to detail view after object create
- Admin - Improve content page layout
- Admin - Add {% block main_content %}
- Admin - Improve object tools list
- Admin - django-guardian support (PRO)
