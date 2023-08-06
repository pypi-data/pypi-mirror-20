Set Linux display brightness from console
=========================================

The ``backlight`` program is a commandline interface to adjust your linux lcd
panels brightness through the linux kernel sys interface

.. contents::
   :local:

Installation
------------

The ``sys_backlight`` package is written in Python and is
available on PyPI_ which means installation should be as simple as::

  $ pip install sys_backlight
Getting started
---------------

The ``sys_backlight`` package can be configured with a configuration file
in the ini format. Here is a example of a config file:

.. code-block:: ini

   # Default variables
   [DEFAULT]
   StepRelative = 2
   StepAbsolute = 10
   MinBrightness = 2
   MaxBrightness = 100

The configuration file is loaded from the following location:

- ``~/.conf/backlight.ini``

The structure of the configuration file is as follows:

- The ``[DEFAULT]`` section has four items, all of which are optional
  (``StepRelative``, ``StepAbsolute``, ``MinBrightness``, and ``MaxBrightness``).

- Currently two types of brightness control are supported:

    1. The physical brightness of the backlight of laptop screens. This uses
       the Linux sysfs_ virtual file system's `/sys/class/backlight`_ interface
       to control backlight brightness. The only required item is
       ``sys-directory`` which is expected to contain the absolute pathname of
       the directory that controls the backlight brightness of your laptop
       screen (you'll have to figure this out for yourself).

Contact
-------

The latest version of ``sys_backlight`` is available on PyPI_
and GitHub_. For bug reports please create an issue on GitHub_. If you have
questions, suggestions, etc. feel free to send me an e-mail at
`hamgom95@gmail.com`_.

License
-------

This software is licensed under the `MIT license`_.

© 2017 Kevin Thomas

.. External references:
.. _/sys/class/backlight: https://www.kernel.org/doc/Documentation/ABI/stable/sysfs-class-backlight
.. _GitHub: https://github.com/hamgom95/sys_backlight
.. _Linux: http://en.wikipedia.org/wiki/Linux
.. _MIT license: http://en.wikipedia.org/wiki/MIT_License
.. _peter@peterodding.com: mailto:hamgom95@gmail.com
.. _PyPI: https://pypi.python.org/pypi/sys_backlight
.. _sysfs: http://en.wikipedia.org/wiki/Sysfs
