.. This README is meant for consumption by humans and pypi. Pypi can render rst files so please do not use Sphinx features.
   If you want to learn more about writing documentation, please check out: http://docs.plone.org/about/documentation_styleguide.html
   This text does not appear on pypi or github. It is a comment.

====================
experimental.bwtools
====================

A product that tries to understand the network connection quality
of the clients

Documentation
-------------

This package injects a small JavaScript file that
every N minutes
starts an asynchronous download of reosources from the site.

The measured performanced are then stored in a cookie and
can be used to activate or deactivate features in your site.

This package does not take care of switching on and off the features.


Installation
------------

Install experimental.bwtools by adding it to your buildout::

    [buildout]

    ...

    eggs =
        experimental.bwtools


and then running ``bin/buildout``


Contribute
----------

- Issue Tracker: https://github.com/collective/experimental.bwtools/issues
- Source Code: https://github.com/collective/experimental.bwtools


Support
-------

If you are having issues, please let us know:

- https://github.com/collective/experimental.bwtools/issues

License
-------

The project is licensed under the GPLv2.
