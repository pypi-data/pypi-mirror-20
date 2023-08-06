========
Showcase
========

A slightly nicer, probably less secure version of ``python -m SimpleHTTPServer``.

Installation
============

``pip install showcase``

Usage
=====

Not for production use, etc. To browse the current folder with Showcase, run::

    FLASK_APP=showcase.app flask run

or, using ``gunicorn``::

    gunicorn showcase:app -b 127.0.0.1:5000

Once it's running, head to http://127.0.0.1:5000 and enjoy.

To browse somewhere other than where you run it from, set the ``SHOWCASE_DIR`` environment variable::

    SHOWCASE_DIR=/path/to/somewhere/else gunicorn showcase:app -b 127.0.0.1:5000

Developing
==========

To run the tests: ``python setup.py test``.

License
=======

See ``LICENSE.txt``.


