===========
 CHANGELOG
===========


Version 0.11.9 - 22 Feb 2017
----------------------------

* Improved error messages when git repo isn't quite right


Version 0.11.8 - 08 Feb 2017
----------------------------

* Terrible hack in ``homely.general`` to get my own dotfiles going again


Version 0.11.7 - 19 Jan 2017
----------------------------

* CLI: ``homely remove`` renamed to ``homely forget``. Also the ``--force`` and
  ``--update`` flags were removed.
* CLI: better docstrings
* ``homely.install.installpkg()`` now requires a ``name`` argument.

Version 0.11.6 - 29 Dec 2016
----------------------------

* Fixed ``homely.files.download()`` which was completely broken.


Version 0.11.5 - 29 Dec 2016
----------------------------

* ``homely.files.download()`` now respects ``expiry`` arg
* ``homely.pipinstall`` uses ``pip --format=legacy`` for newer versions of pip


Version 0.11.4 - 02 Nov 2016
----------------------------

* Fix binary downloads in `homely.general`


Version 0.11.3 - 02 Nov 2016
----------------------------

* Ensure `homely.install.installpkg` uses the correct package name for yum/apt etc


Version 0.11.2 - 02 Nov 2016
----------------------------

* Fix broken `yum ... --assume-yes` in homely.install


Version 0.11.1 - 02 Nov 2016
----------------------------

* Fix broken import in homely.install


Version 0.11.0 - 16 Oct 2016
----------------------------

* Refactor yesno() and interactivity mechanisms
* Refactor homely.install.InstallPackage


Version 0.10.0 - 04 Oct 2016
----------------------------

* Refactor pipinstall API
