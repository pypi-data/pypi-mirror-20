La Poste SDK
============

.. image:: https://travis-ci.org/geelweb/laposte-python-sdk.svg?branch=master
    :target: https://travis-ci.org/geelweb/laposte-python-sdk
.. image:: https://coveralls.io/repos/github/geelweb/laposte-python-sdk/badge.svg?branch=master
    :target: https://coveralls.io/github/geelweb/laposte-python-sdk?branch=master
.. image:: https://img.shields.io/badge/python-2.7%2C%20~3.3-blue.svg


LaPosteSDK is a Python client library to work with `La Poste API <https://developer.laposte.fr/products>`_

Installation
------------

.. code-block:: text

    pip install lapostesdk

Requirements
------------

* requests

Dev requirements

* responses

Configuration
-------------

.. code-block:: python

    from lapostesdk.laposteapi import LaPosteApi
    api = LaPosteApi(api_key='YourApiKey')

Test suite
----------

.. code-block:: text

    python -m unittest test

Apis
----

ControlAdresse
~~~~~~~~~~~~~~

The `ControlAdresse Api <https://developer.laposte.fr/products/controladresse/latest>`_

Address look up
^^^^^^^^^^^^^^^

.. code-block:: python

    response = api.controladresse.search('116 avenue du Président Kennedy 75220 Paris Cedex 16')

Address details
^^^^^^^^^^^^^^^

    adresse = api.controladresse.get('adresses/12280852')
    print adresse.codePostal

Suivi
~~~~~

The `Suivi Api <https://developer.laposte.fr/products/suivi/latest>`_

.. code-block:: python

    suivi = api.suivi.get('1111111111111')
    print suivi.status

