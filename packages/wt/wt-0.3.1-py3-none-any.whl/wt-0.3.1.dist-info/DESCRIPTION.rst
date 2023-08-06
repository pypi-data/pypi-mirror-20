**wt** - static blog generator
==============================

|Build Status|

What
----

Pretty small and simplified static blog generator with following
features:

-  `markdown <http://daringfireball.net/projects/markdown/>`__ for
   content
-  `yaml <http://yaml.org/>`__ for configuration
-  `jinja2 <http://jinja.pocoo.org/>`__ for templating
-  `atom <https://en.wikipedia.org/wiki/Atom_(standard)>`__ for feed
-  `aiohttp <http://aiohttp.readthedocs.io/en/stable/>`__ for
   development server
-  only two types of content - **page** and **post**
-  content metadata lives in configuration file
-  have sensible defaults for content sources
-  no python coding needed to work with

Why
---

| While `pelican <http://docs.getpelican.com/>`__ is great and is full
  of features and `grow <https://grow.io/>`__ is
| another one and looks very interesting in this field and there are a
  lot more
| static site generators I wanted to create something easy to work with.

Hope someday somebody will find this library pretty usefull.

How
---

Requirements
~~~~~~~~~~~~

The only hard dependency is **python3**.

Installation
~~~~~~~~~~~~

.. code:: shell

    $ mkdir blog && cd blog
    $ mkdir env && virtualenv -p python3 env && source ./env/bin/activate
    $ pip install wt

Bootstrapping
~~~~~~~~~~~~~

.. code:: shell

    $ wt init .

Configuration
~~~~~~~~~~~~~

| Your blog must have configuration file written in
  `yaml <http://yaml.org/>`__ and named
| **wt.yaml** (name can be changed).

Usage
~~~~~

While writing content (ie in development mode):

.. code:: shell

    $ wt develop

This command will start the development server listening at
127.0.0.1:9000.

When content is ready you will need to build it:

.. code:: shell

    $ wt build

Roadmap
-------

-  [ ] documentation
-  [x] [STRIKEOUT:posts list pagination]
-  [ ] support for tags

License
-------

MIT

.. |Build Status| image:: https://travis-ci.org/ysegorov/wt.svg?branch=master
   :target: https://travis-ci.org/ysegorov/wt


