sprockets.mixins.amqp
=====================
AMQP Publishing Mixin for Tornado RequestHandlers.

|Version| |Downloads| |Travis| |CodeCov| |Docs|

Installation
------------
``sprockets.mixins.amqp`` is available on the
`Python Package Index <https://pypi.python.org/pypi/sprockets.mixins.amqp>`_
and can be installed via ``pip`` or ``easy_install``:

.. code-block:: bash

   pip install sprockets.mixins.amqp

Documentation
-------------
https://pythonhosted.org/sprockets.mixins.amqp

Requirements
------------
- pika>=0.10.0
- tornado>=4.2.0

Example
-------
This examples demonstrates the most basic usage of ``sprockets.mixins.amqp``

.. code:: bash

   export AMQP_URL="amqp://user:password@rabbitmq_host:5672/%2f"
   python my-example-app.py


.. code:: python

   import json

   from tornado import gen, web
   from sprockets.mixins import amqp

   def make_app(**settings):
       application = web.Application(
           [
               web.url(r'/', RequestHandler),
           ], **settings)

       amqp.install(application)
       return application


   class RequestHandler(amqp.PublishingMixin, web.RequestHandler):

       @gen.coroutine
       def get(self, *args, **kwargs):
           body = {'request': self.request.path, 'args': args, 'kwargs': kwargs}
           yield self.amqp_publish('exchange', 'routing.key', json.dumps(body),
                                   {'content_type': 'application/json'})

Settings
^^^^^^^^

:url: The AMQP url
:timeout: The connect timeout, in seconds, if the connection when you try to publish.
:connection_attempts: The maximum number of retry attempts in case of connection errors.

Source
------
``sprockets.mixins.amqp`` source is available on Github at `https://github.com/sprockets/sprockets.mixins.amqp <https://github.com/sprockets/sprockets.mixins.amqp>`_

License
-------
``sprockets.mixins.amqp`` is released under the `3-Clause BSD license <https://github.com/sprockets/sprockets.mixins.amqp/blob/master/LICENSE>`_.

.. |Version| image:: https://badge.fury.io/py/sprockets.mixins.amqp.svg?
   :target: http://badge.fury.io/py/sprockets.mixins.amqp

.. |Travis| image:: https://travis-ci.org/sprockets/sprockets.mixins.amqp.svg?branch=master
   :target: https://travis-ci.org/sprockets/sprockets.mixins.amqp

.. |CodeCov| image:: http://codecov.io/github/sprockets/sprockets.mixins.amqp/coverage.svg?branch=master
   :target: https://codecov.io/github/sprockets/sprockets.mixins.amqp?branch=master

.. |Downloads| image:: https://pypip.in/d/sprockets.mixins.amqp/badge.svg?
   :target: https://pypi.python.org/pypi/sprockets.mixins.amqp

.. |Docs| image:: https://img.shields.io/badge/docs-pythonhosted-green.svg
   :target: https://pythonhosted.com/sprockets.mixins.amqp
