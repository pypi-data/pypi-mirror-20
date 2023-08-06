``miniweb`` is a Python module that allow us to build hassle free small web
projects. It is based on Django, but it is extremely simplified and requires no
boilerplate. The goal is to provide a nice environment to teach programming
for non-programmers (specially kids) and introduce them to basic web technology.

Hello World
-----------

This is our first web server

.. code-block:: python

    from miniweb import *

    @url
    def index():
        return 'Hello World!'

    start_server()


