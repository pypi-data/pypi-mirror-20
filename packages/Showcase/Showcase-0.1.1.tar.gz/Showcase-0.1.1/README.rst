========
Showcase
========

A slightly nicer, probably less secure version of ``python -m SimpleHTTPServer``.


Installation
============

``pip install showcase``

Usage
=====

Not for production use, etc, but in development, something like::

    FLASK_APP=showcase.app FLASK_DEBUG=1 flask run

and in production, something more like::

    gunicorn showcase:app

To have it start somewhere other than where it is installed, set the ``SHOWCASE_DIR`` environment variable.

License
=======

See ``LICENSE.txt``.
