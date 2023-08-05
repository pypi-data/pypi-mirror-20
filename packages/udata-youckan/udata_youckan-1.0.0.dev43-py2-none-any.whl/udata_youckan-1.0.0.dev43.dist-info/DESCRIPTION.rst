uData-youckan
=============


.. image:: https://badges.gitter.im/Join%20Chat.svg
    :target: https://gitter.im/opendatateam/udata
    :alt: Join the chat at https://gitter.im/opendatateam/udata


This plugin provide integration between `uData`_ and `YouCKAN`_

Compatibility
-------------

**udata-youckan** requires Python 2.7+ and `uData`_.


Installation
------------

Install `uData`_.

Remain in the same virtual environment (for Python) and use the same version of npm (for JS).

Install **udata-youckan**:

.. code-block:: shell

    pip install udata-youckan



Configuration
-------------

In order to use YouCKAN as authentication provider, you need to enable the plugin
and add the following mandatory parameters to you uData configuration
(typically, `udata.cfg`) as following:

.. code-block:: python

    PLUGINS = ['youckan']
    YOUCKAN_URL = 'https://your.youckan.url/'
    YOUCKAN_CONSUMER_KEY = 'your-youckan-client-key',
    YOUCKAN_CONSUMER_SECRET = 'your-youckan-secret-key'



.. _circleci-url: https://circleci.com/gh/opendatateam/udata-youckan
.. _circleci-badge: https://circleci.com/gh/opendatateam/udata-youckan.svg?style=shield
.. _gitter-badge: https://badges.gitter.im/Join%20Chat.svg
.. _gitter-url: https://gitter.im/opendatateam/udata
.. _uData: https://github.com/opendatateam/udata
.. _YouCKAN: https://github.com/etalab/youckan

Changelog
=========

Current (in progress)
---------------------

- Use email to fetch user instead of slug (`#7 <https://github.com/opendatateam/udata-youckan/pull/7>`_)
- Keep active state synchronized (`#6 <https://github.com/opendatateam/udata-youckan/pull/6>`_)

0.9.1 (2017-01-10)
------------------

- Fix packaging

0.9.0 (2017-01-10)
------------------

- First published release



