Bear Installation Tool
======================

coala features a Bear Installation Tool that helps installing bears one by one
or all of them. This tool is helpful as it also manages to install the bears'
external dependencies.

Installation
============

To install the tool, simply run:

::

    $ pip3 install cib

Usage
=====


To use the tool, you need to give it arguments.

To install bears, simply run ``cib install`` followed by names of bears,
or by ``all``. Therefore:

::

    $ cib install all

will install all the available bears, whereas

::

    $ cib install CPPCheckBear PEP8Bear

will install the specified bears only.
``cib uninstall`` works exactly the same way as ``cib install``.

To see the full list of available bears, run

::

    $ cib list

To upgrade the already installed bears, run

::

    $ cib upgrade all

to upgrade all installed bears, or

::

    $ cib upgrade CPPCheckBear PEP8Bear

to upgrade the specified bears. However, if they are not installed, they will
not be upgraded.

To check whether a bear meets all its dependencies, use

::

    $ cib check-deps all

This will ensure all the installed bears have met their dependencies.

For more information, run

::

    $ cib help
