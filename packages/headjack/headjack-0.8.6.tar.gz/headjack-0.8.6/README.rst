headjack 
=========================

.. image:: https://readthedocs.org/projects/headjack/badge/
    :target: http://headjack.readthedocs.io/en/latest/?badge
    :alt: Documentation Status

.. image:: https://cdn.rawgit.com/thespacedoctor/headjack/master/coverage.svg
    :target: https://cdn.rawgit.com/thespacedoctor/headjack/master/htmlcov/index.html
    :alt: Coverage Status

*A python package and command-line tools to download, organize, share, archive and reference various kinds of media. Books, podcasts, articles, videos ...*.

Here's a summary of what's included in the python package:

.. include:: /classes_and_functions.rst


Command-Line Usage
==================

.. code-block:: bash 
   
    
    Documentation for headjack can be found here: http://headjack.readthedocs.org/en/stable
    
    Usage:
        headjack read sendToKindle [-s <pathToSettingsFile>]
        headjack read convert kindleAnnotations [-s <pathToSettingsFile>]
        headjack web2epub [-s <pathToSettingsFile>]
        headjack media (stage|archive) [-s <pathToSettingsFile>]
        headjack marvin [-s <pathToSettingsFile>]
        headjack dt <pathToImportFolder> <pathToDevonthinkDB> [-s <pathToSettingsFile>]
    
        marvin                convert and import the database exported from the Marvin iOS app, then export all read articles ready for import into devonthink
        web2epub              convert web-articles queued in the headjack database into epub books
        dt                    import a media package into devonthink
    
        pathToImportFolder    path to the root directory containing the package to import into a devonthink database
        pathToDevonthinkDB    path to the devonthink database to import the contain into
        
        -h, --help            show this help message
        -s, --settings        the settings file
    

Documentation
=============

Documentation for headjack is hosted by `Read the Docs <http://headjack.readthedocs.org/en/stable/>`__ (last `stable version <http://headjack.readthedocs.org/en/stable/>`__ and `latest version <http://headjack.readthedocs.org/en/latest/>`__).

Installation
============

The easiest way to install headjack is to use ``pip``:

.. code:: bash

    pip install headjack

Or you can clone the `github repo <https://github.com/thespacedoctor/headjack>`__ and install from a local version of the code:

.. code:: bash

    git clone git@github.com:thespacedoctor/headjack.git
    cd headjack
    python setup.py install

To upgrade to the latest version of headjack use the command:

.. code:: bash

    pip install headjack --upgrade


Development
-----------

If you want to tinker with the code, then install in development mode.
This means you can modify the code from your cloned repo:

.. code:: bash

    git clone git@github.com:thespacedoctor/headjack.git
    cd headjack
    python setup.py develop

`Pull requests <https://github.com/thespacedoctor/headjack/pulls>`__
are welcomed!


Issues
------

Please report any issues
`here <https://github.com/thespacedoctor/headjack/issues>`__.

License
=======

Copyright (c) 2016 David Young

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

