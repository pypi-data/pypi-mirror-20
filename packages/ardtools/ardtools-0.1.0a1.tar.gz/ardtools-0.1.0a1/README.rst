==========
ARDTools
==========

Tools for command line control of Apple Remote Desktop/Screen Sharing

Installation and Set-up
=======================

The best way to install ardtools is via PyPi and pip.

Install with:

	``pip install ardtools``

and the ardtools commands should be placed somewhere in your path. On some
systems/installations you may need a:

	``sudo pip install ardtools``.

Usage
=====

Get help with ``ardtools -h`` or ``ardtools --help``

Get the current version with ``ardtools -v`` or ``ardtools --version``

In use ardtools must be invoked with sudo (or as a user with super-user 
privileges). If not it should prompt for authorisation 

To use ardtools you invoke it followed by a command.

    ``sudo ardtools restart``

Currently ardtools accepts the following commands:

* ``r`` or ``restart``
		This tells ardtools to restart and activate Apple Remote Desktop and 
		its helper agent.

Contribution guidelines
=======================

Feel free to send me pull requests. I have one requirement, all submitted
code must pass checking with flake8_

.. _flake8: http://flake8.pycqa.org

Licence
=======

BSD

Footnotes
=========

.. target-notes::
