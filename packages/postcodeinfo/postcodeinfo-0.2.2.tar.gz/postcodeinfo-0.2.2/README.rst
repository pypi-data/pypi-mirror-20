PostcodeInfo Client
===================

.. image:: https://travis-ci.org/ministryofjustice/postcodeinfo-client-python.svg?branch=master
  :alt: Test result
  :target: http://ci.dsd.io/job/BUILD-postcodeinfo-client-python/lastCompletedBuild/testReport/

.. image:: https://coveralls.io/repos/ministryofjustice/postcodeinfo-client-python/badge.svg?branch=HEAD&service=github
  :target: https://coveralls.io/github/ministryofjustice/postcodeinfo-client-python?branch=HEAD
  :alt: Coverage report

.. image:: https://codeclimate.com/github/ministryofjustice/postcodeinfo-client-python/badges/gpa.svg
   :target: https://codeclimate.com/github/ministryofjustice/postcodeinfo-client-python
   :alt: Code Climate

.. image:: https://requires.io/github/ministryofjustice/postcodeinfo-client-python/requirements.svg?branch=master
     :target: https://requires.io/github/ministryofjustice/postcodeinfo-client-python/requirements/?branch=master
     :alt: Requirements Status

Python package providing an API client for https://github.com/ministryofjustice/postcodeinfo
which contains public sector information licensed under the Open Government License v2.0


Installation
------------

.. code-block:: bash

    pip install postcodeinfo


Usage
-----

Authentication
~~~~~~~~~~~~~~

You will need an *authentication token* (auth token). If you're using MOJ DS's
Postcode Info server, you can get a token by emailing
platforms@digital.justice.gov.uk with a brief summary of:

* who you are
* what project you're going to be using it on
* roughly how many lookups you expect to do per day

If you're running your own server, see
https://github.com/ministryofjustice/postcodeinfo#auth_tokens for instructions
on how to create a token.

Quick Start
~~~~~~~~~~~

In your code:

.. code-block:: python

    >>> import postcodeinfo

    >>> # create a client
    >>> client = postcodeinfo.Client("YOUR-ACCESS-TOKEN")

    >>> # lookup a postcode
    >>> postcode = client.lookup_postcode("SW1A 1AA")

    >>> # postcode details
    >>> postcode.valid
    True

    >>> postcode.latitude
    51.50100893654096

    >>> postcode.longitude
    -0.141587558526369

    >>> postcode.local_authority
    {
        'gss_code': 'E09000033',
        'name': 'Westminster'
    }

    >>> postcode.country
    {
        "name": "England",
        "gss_code": "E92000001"
    }

    >>> postcode.addresses
    [
        {
            "uprn": "10033544614",
            "organisation_name": "BUCKINGHAM PALACE",
            "department_name": "",
            "po_box_number": "",
            "building_name": "",
            "sub_building_name": "",
            "building_number": None,
            "thoroughfare_name": "",
            "dependent_thoroughfare_name": "",
            "dependent_locality": "",
            "double_dependent_locality": "",
            "post_town": "LONDON",
            "postcode": "SW1A 1AA",
            "postcode_type": "L",
            "formatted_address": "Buckingham Palace\nLondon\nSW1A 1AA",
            "point": {
                "type": "Point",
                "coordinates": [
                    -0.141587558526369,
                    51.50100893654096
                ]
            }
        }
    ]


Configuration
-------------

Apart from the auth token, there is only one other parameter the API client
needs - ``api_url``.

Explicit ``api_url``
~~~~~~~~~~~~~~~~~~~~

You can set the api_url explicitly by passing it to the ``Client`` constructor

.. code-block:: python

    # create a client
    client = postcodeinfo.Client("YOUR-API-TOKEN", api_url="https://some.dom.ain")

or by setting it on an existing client, like this

.. code-block:: python

    client = postcodeinfo.Client("YOUR-API-TOKEN")
    client.api_url = "https://some.dom.ain"

Implicit ``api_url``
~~~~~~~~~~~~~~~~~~~~

If you don't pass an ``api_url`` to the constructor, it will attempt to infer
one from the environment. The client has a built-in mapping of environment names
to URLs.

.. code-block:: python

    >>> postcodeinfo.Client.api_urls
    {
        'development': 'http://localhost:8000',
        'test': 'http://localhost:8000',
        'staging': 'https://postcodeinfo-staging.dsd.io',
        'production': 'https://postcodeinfo.service.justice.gov.uk'
    }

It will use the following rules to infer the URL:

1. If you pass an ``env`` parameter to the constructor (eg:
   ``client = postcodeinfo.Client("YOUR-API-TOKEN", env="staging")``), it will
   use that as a reference into the ``api_urls`` mapping.
2. If you have ``DJANGO_SETTINGS_MODULE`` set in your environment, it will try
   to find the following settings in that module::

    POSTCODEINFO_API_URL
    POSTCODEINFO_API_TOKEN
    POSTCODEINFO_API_TIMEOUT

3. Otherwise it will default to ``development``


Support
-------

This source code is provided as-is, with no incident response or support levels.
Please log all questions, issues, and feature requests in the Github issue
tracker for this repo, and we'll take a look as soon as we can. If you're
reporting a bug, then it really helps if you can provide the smallest possible
bit of code that reproduces the issue. A failing test is even better!


Contributing
------------

* Check out the latest master to make sure the feature hasn't been implemented
  or the bug hasn't been fixed
* Check the issue tracker to make sure someone hasn't already requested
  and/or contributed the feature
* Fork the project
* Start a feature/bugfix branch
* Commit and push until you are happy with your contribution
* Make sure your changes are covered by unit tests, so that we don't break it
  unintentionally in the future.
* Please don't mess with setup.py, version or history.


Copyright
---------

Copyright |copy| 2015 HM Government (Ministry of Justice Digital Services). See
LICENSE for further details.

.. |copy| unicode:: 0xA9 .. copyright symbol
