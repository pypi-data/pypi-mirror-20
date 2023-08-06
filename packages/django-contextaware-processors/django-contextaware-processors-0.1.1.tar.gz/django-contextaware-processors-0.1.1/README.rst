django-contextaware-processors
==============================

:author: Keryn Knight
:version: 0.1.1

.. |travis_stable| image:: https://travis-ci.org/kezabelle/django-contextaware-processors.svg?branch=0.1.1
  :target: https://travis-ci.org/kezabelle/django-contextaware-processors

.. |travis_master| image:: https://travis-ci.org/kezabelle/django-contextaware-processors.svg?branch=master
  :target: https://travis-ci.org/kezabelle/django-contextaware-processors

==============  ======
Release         Status
==============  ======
stable (0.1.1)  |travis_stable|
master          |travis_master|
==============  ======

.. contents:: Sections
   :depth: 3

What it does
------------

Ever used `Django`_ and wished you could have a `context processor`_ which
received the existing context, along with the request, so that it could do
different things depending on the values the view provided? This does that, as
long as you're using `TemplateResponse`_ objects and not ``render()`` or
``render_to_response()``.

Installation
------------

You can use `pip`_ to install the ``0.1.1`` version from `PyPI`_::

    pip install django-contextaware-processors==0.1.1

Or you can grab it from  `GitHub`_  like this::

  pip install -e git+https://github.com/kezabelle/django-contextaware-processors.git#egg=django-contextaware-processors

Usage
-----

Add a new ``CONTEXTAWARE_PROCESSORS`` setting to your project configuration. It
should be an iterable of strings representing the dotted paths to your
processors, just the same as the `Django`_ context processors are configured::

    CONTEXTAWARE_PROCESSORS = ('path.to.my_processor', 'another_processor.lives.here')

Processors are executed in the order in which they are declared, and update the
original context data. The new context is given to subsequent processors, such
that the last processor above (``another_processor.lives.here``) will see any
changes made by ``path.to.my_processor``.

Using the middleware
^^^^^^^^^^^^^^^^^^^^

In most cases, if you're using ``TemplateResponse`` objects (or any `Class
Based View`_ which uses them for you), you want to use the provided
middleware::

    MIDDLEWARE_CLASSES = (
        # ...
        'contextaware_processors.middleware.ContextawareProcessors',
        # ...
    )

As this makes use of ``process_response(request, response)`` you probably want
it somewhere near the bottom, so that it modifies the context on the way out
as soon as possible. The middleware will automatically apply any processors
defined in ``CONTEXTAWARE_PROCESSORS``

Using the TemplateResponse subclass
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For custom situations, there is
``context_processors.response.ContextawareTemplateResponse`` class which
exposes an ``add_context_callback(callback_function)`` which can be used to
apply view-specific context modifiers, though why you'd need to is not
immeidiately obvious to me ;)
If the ``ContextawareProcessors`` middleware notices a ``ContextawareTemplateResponse`` it
will add those defined in ``CONTEXTAWARE_PROCESSORS`` *after* any previously
registered custom modifiers.


Writing a context-aware processor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The API contract for a processor is the same as a normal context processor, but
with the addition of a ``context`` parameter, sent as a *named-kwarg*.

A normal context processor looks like::

    def my_processor(request):
        return {'MY_VALUE': 1}

While a context-aware processor looks like::

    def my_processor(request, context):
        if 'MY_KEY' in context:
            return {'MY_VALUE': 2}
        return {'MY_VALUE': None}

Return values
"""""""""""""

A context-aware processor must return one of 3 things:
- A ``dictionary`` to ``.update(...)`` the existing context with,
- ``NotImplemented`` may be used to mark it as irrelevant for the request
- For convienience, ``None`` may also be used to skip updating the context.

Supported Django versions
-------------------------

The tests are run against `Django`_ 1.8 through 1.10, and Python 2.7, 3.3, 3.4 and 3.5.

Running the tests
^^^^^^^^^^^^^^^^^

If you have a cloned copy, you can do::

  python setup.py test

If you have tox, you can just do::

  tox

Contributing
------------

Please do!

The project is hosted on `GitHub`_ in the `kezabelle/django-contextaware-processors`_
repository.

Bug reports and feature requests can be filed on the repository's `issue tracker`_.

If something can be discussed in 140 character chunks, there's also `my Twitter account`_.

The license
-----------

It's `FreeBSD`_. There's should be a ``LICENSE`` file in the root of the repository, and in any archives.

.. _FreeBSD: http://en.wikipedia.org/wiki/BSD_licenses#2-clause_license_.28.22Simplified_BSD_License.22_or_.22FreeBSD_License.22.29
.. _Django: https://www.djangoproject.com/
.. _Class Based View: https://docs.djangoproject.com/en/stable/topics/class-based-views/
.. _context processor: https://docs.djangoproject.com/en/stable/topics/templates/#context-processors
.. _TemplateResponse: https://docs.djangoproject.com/en/stable/ref/template-response/
.. _GitHub: https://www.github.com/
.. _kezabelle/django-contextaware-processors: https://www.github.com/kezabelle/django-contextaware-processors/
.. _issue tracker: https://www.github.com/kezabelle/django-contextaware-processors/issues/
.. _my Twitter account: https://www.twitter.com/kezabelle/
.. _pip: https://pip.pypa.io/en/stable/
.. _PyPI: https://pypi.python.org/pypi
