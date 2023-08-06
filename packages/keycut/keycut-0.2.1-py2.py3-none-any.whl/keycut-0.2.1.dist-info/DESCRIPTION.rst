======
KeyCut
======



Helper tool to show and search shortcuts for your favorite programs.

KeyCut (for keyboard shortcut) is a command line tool
that helps you remembering the numerous keyboard shortcuts
of your favorite programs, both graphical and command line ones,
by allowing you to print them quickly in a console and search through them.

Shortcut data are provided by the `keycut-data`_ repository.

This repo contains the sources for a Python implementation of KeyCut.

It looks like this
==================

The yellow parts are the one that matched a pattern using a regular expression.

.. image:: http://i.imgur.com/ZaqTOUb.png

License
=======

Software licensed under `ISC`_ license.

.. _ISC : https://www.isc.org/downloads/software-support-policy/isc-license/

Installation
============

::

    [sudo -H] pip install keycut

You will also need to download the data by cloning the repository somewhere:

::

    git clone https://github.com/Pawamoy/keycut-data keycut_data

Usage
=====

The program needs to know where the data are. By default, it will search
in the (relative) `keycut-data/default` directory.

.. code:: bash

    export KEYCUT_DATA=/somewhere/keycut_data/default

Show all bash shortcuts:

.. code:: bash

    keycut bash

Show all bash shortcuts matching *proc* (in Category, Action, or Keys):

.. code:: bash

    keycut bash proc


Documentation
=============

https://github.com/Pawamoy/keycut/wiki

Development
===========

To run all the tests: ``tox``

Todo
====

- Interactive UI with search commands
- Follow the principles in `keycut-data`_ repo (inheritance, attributes)

.. _keycut-data : https://github.com/Pawamoy/keycut-data
.. _keycut-data README : https://github.com/Pawamoy/keycut-data/blob/master/README.md

=========
Changelog
=========

0.1.0 (2016-01-15)

* Alpha release on PyPI.


