picaxe 
=========================

.. image:: https://readthedocs.org/projects/picaxe/badge/
    :target: http://picaxe.readthedocs.io/en/latest/?badge
    :alt: Documentation Status

.. image:: https://cdn.rawgit.com/thespacedoctor/picaxe/master/coverage.svg
    :target: https://cdn.rawgit.com/thespacedoctor/picaxe/master/htmlcov/index.html
    :alt: Coverage Status

*A python package and command-line tools for work with the Flickr API to upload images, sort images, generate MD image reference links etc*.

Here's a summary of what's included in the python package:

.. include:: /classes_and_functions.rst

Command-Line Usage
==================

.. code-block:: bash 
   
    
    Documentation for picaxe can be found here: http://picaxe.readthedocs.org/en/stable
    
    Usage:
        picaxe init
        picaxe auth [-s <pathToSettingsFile>]
        picaxe md <urlOrPhotoid> [<width>] [-s <pathToSettingsFile>]
        picaxe albums [-s <pathToSettingsFile>]
        picaxe [-giop] upload <imagePath> [--title=<title> --tags=<tags> --desc=<desc> --album=<album>]
        picaxe [-op] grab [--title=<title> --tags=<tags> --desc=<desc> --album=<album>]
    
    Options:
        init                  setup the polygot settings file for the first time
        auth                  authenticate picaxe against your flickr account
        md                    generate the MD reference link for the image in the given flickr URL
        albums                list all the albums in the flickr account
        upload                upload a local image to flickr
    
        <pathToSettingsFile>  path to the picaxe settings file
        <urlOrPhotoid>        the flickr URL or photoid
        <width>               pixel width resolution of the linked image. Default *original*. [75|100|150|240|320|500|640|800|1024|1600|2048]
        <imagePath>           path to the local image to upload to flickr
    
        --title=<title>       the image title
        --tags=<tags>         quoted, comma-sepatated tags
        --desc=<desc>         image description
        
        -p, --public          make the image public (private by default)
        -o, --open            open the image in the flickr web-app once uploaded
        -i, --image           "photo" is an image
        -g, --screenGrab      "photo" is a screengrab
        -h, --help            show this help message
        -v, --version         show version
        -s, --settings        the settings file
    

Installation
============

The easiest way to install picaxe is to use ``pip``:

.. code:: bash

    pip install picaxe

Or you can clone the `github repo <https://github.com/thespacedoctor/picaxe>`__ and install from a local version of the code:

.. code:: bash

    git clone git@github.com:thespacedoctor/picaxe.git
    cd picaxe
    python setup.py install

To upgrade to the latest version of picaxe use the command:

.. code:: bash

    pip install picaxe --upgrade


Documentation
=============

Documentation for picaxe is hosted by `Read the Docs <http://picaxe.readthedocs.org/en/stable/>`__ (last `stable version <http://picaxe.readthedocs.org/en/stable/>`__ and `latest version <http://picaxe.readthedocs.org/en/latest/>`__).

Command-Line Tutorial
=====================

Before you begin using picaxe you'll need to populate some custom settings within the picaxe settings file.

To setup the default settings file at ``~/.config/picaxe/picaxe.yaml`` run the command:

.. code-block:: bash 
    
    picaxe init

This should create and open the settings file; follow the instructions in the file to populate the missing settings values (usually given an ``XXX`` place-holder). 
      
Authenticating Picaxe Against Your Flickr Account
-------------------------------------------------

In order to use picaxe for the first time you'll need to first authenticate it against your Flickr account. This is to give picaxe permission to read your private photo metadata to generate markdown image links etc and also the ability to upload images and screengrabs to your various albums.

The ``picaxe init`` command should initiate the authentication process if you're running picaxe for the first time, but if you need to run the authentication process again for any reason use:

.. code-block:: bash 
    
    picaxe auth

You should see something like this, and then your default browser *should* open at the URL presented (if not just copy and paste the URL into your browser):

.. code-block:: text 
     
    Now to authorize picaxe against your personal flickr account
    Navigate to https://www.flickr.com/services/oauth/authorize?perms=write&oauth_token=72157678178240312-c1e614c89bbfa330 and click on 'OK, I'LL AUTHOURIZE IT'
    What is the oauth_verifier value in URL you where redirected to?
      > 

You'll be presented with an authentication request like the one below. Click 'OK, I'LL AUTHOURIZE IT'.

.. image:: https://i.imgur.com/KMP8rEp.png
        :width: 800px
        :alt: picaxe authorisation request from flickr

You'll then be redirected to *thespacedoctor* website and in the URL you'll notice there are ``oauth_token`` and ``oauth_verifier`` parameters. 

.. image:: https://i.imgur.com/tOEyonj.png
        :width: 800px
        :alt: oauth_verifier in URL

Copy the ``oauth_verifier`` value, paste it into the terminal and hit return. That's it. Simples. Your credentials are now written into the picaxe settings file which can be found at ``~/.config/picaxe/picaxe.yaml``.

Listing Albums in Flickr Account
--------------------------------

To list all of the albums in your Flickr account run the command:

.. code-block:: bash 
    
    picaxe albums

This prints the titles of all the albums you have created in your Flickr account to stdout:

.. code-block:: bash 
     
    Auto Upload
    home movies
    projects: thespacedoctor
    notes: images and screengrabs
    blog: workflow tags
    family photos 


Generating a Multi-Markdown Image Link from Any Flickr Image
------------------------------------------------------------

To generate a MMD image link for any image in your Flickr account (private or public), or any other public Flickr image, run the command:

.. code-block:: bash 
    
    picaxe md <urlOrPhotoid> 

Take `this image <https://www.flickr.com/photos/92344016@N06/30588492355/in/album-72157675576126786/>`_ for example. To generate the MMD image link run:

.. code-block:: bash 
    
    picaxe md https://www.flickr.com/photos/92344016@N06/30588492355/in/album-72157675576126786/

or just quote the photo-id (*30588492355* in this case):

.. code-block:: bash 
    
    picaxe md 30588492355

Here's the MMD link dumped to stdout:

.. code-block:: text 
    
    ![][Photoelectric effect 30588492355]

    [Photoelectric effect 30588492355]: https://farm6.staticflickr.com/5722/30588492355_147111fcd3_o.png title="Photoelectric effect" width=600px 

Note the image reference is generated from the image title (if there is one) and photo-id so should always be unique (i.e. no reference name clashes in your MMD documents).

Uploading Local Images to Flickr
--------------------------------

It's possible to upload images to Flickr via the command-line with options to set tags, album, titles, descriptions and privacy levels with picaxe. To do so use the command:

.. code-block:: bash 
    
    picaxe [-giop] upload <imagePath> [--title=<title> --tags=<tags> --desc=<desc> --album=<album>]

So in its simplest form you could upload an image with picaxe like:

.. code-block:: bash 

    picaxe upload "/path/to/image.png"

as *title*, *description*, *album* and *tags* are optional arguments. The `-g` flag indicates that the uploaded image is a screengrab, `-i` that it is an image (as opposed to a photo), `-p` requests that the image be made public and `-o` that the image be opened in the Flickr web-app in your default browser once upload has completed.

Taking Screenshots with picaxe
------------------------------

The command for taking a screenshot with picaxe is similar to the command for uploading local images:

.. code-block:: bash 
    
    picaxe [-op] grab [--title=<title> --tags=<tags> --desc=<desc> --album=<album> --delay=<sec>]

By default picaxe will upload screenshots to a 'screengrabs' album unless a specific album is specified. All I need to do to trigger a screenshot selection cursor is run the following:

.. code-block:: bash 
    
    picaxe grab

I can now select the section of the screen I want to clip, or press space-bar to change to a window-selection cursor, and picaxe will upload the resulting image to flickr and dump the multi-markdown image link to stdout.

As this command is run from the terminal you will probably want a little time to navigate to the correct desktop/application you wish to take a screenshot of before the screen-capture cursor is activated. To do this pass in a delay in seconds via the `--delay` flag; so for a 3 sec delay run:

.. code-block:: bash 
    
    picaxe grab --delay=3




    





 



    

