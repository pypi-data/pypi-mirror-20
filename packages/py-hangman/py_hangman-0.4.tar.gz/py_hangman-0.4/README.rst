2 Player Hangman
================

Overview
--------

Welcome to this 2 Player Hangman game.

Note: This project was primarily created for the following purposes -

- Getting hands-on experience with GitHub
- Learning simple game development in Python
- Understanding packaging and distribution in Python
- Getting some experience with tools like tox and Travis CI

Installing Hangman
------------------

Clone the repo and run ``pip install .`` from the directory containing setup.py.

TODO: Upload to PyPI, so users can do ``pip install py-hangman``. Issue - #5

Running Hangman
---------------

A binary called *hangman* is created during installation.

If you install the project inside a virtualenv, the hangman binary will
be present in the bin directory of the virtualenv.

Run the hangman binary to start the game. Follow the instructions on screen to continue.

Testing
-------

Tests are written using unittest. Run them with -
``python tests.py -b``
