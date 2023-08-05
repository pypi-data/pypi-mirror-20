wallapopy
=========

This library provides a pure Python client for Wallapop. It works with
Python versions from 2.6+ and Python 3.

API
---

Already implemented:

-  User:

   -  Profile.
   -  Sold items.
   -  Unsold published items.
   -  Reviews sent to others.
   -  Reviews received by others.

-  Items search.

Other endpoints will be implemented as needed or requested.

Installing
----------

You can install wallapopy using:

::

    $ pip install wallapopy

Using
-----

The motivation for this project was to enable research about reputation
in the Sharing Ecoomy. That's the reason it includes a *request builder*
which can be used together with *Scrapy*. Nevertheless it also includes
a *client* that directly returns the data.

Request Builder
~~~~~~~~~~~~~~~

It returns a url that can be queried to access the data together with
the information needed to do it.

.. code:: python

    >>> from request_builder import WallapopRequestBuilder
    >>> request_builder = WallapopRequestBuilder()
    >>> request_builder.user(40000000)
    {'method': 'GET', 'url': 'http://pro2.wallapop.com/shnm-portlet/api/v1/user.json/40000000?'}

Client
~~~~~~

Leveraging the *request builder*, a client that directly downloads the
data.

.. code:: python

    >>> from client import WallapopClient
    >>> client = WallapopClient()
    >>> client.user(40000000)
    {u'gender': u'M', u'image': {u'averageHexColor': u'565b51', u'pictureId': 148033140...


