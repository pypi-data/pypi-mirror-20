picaxe
======

[![Documentation Status](https://readthedocs.org/projects/picaxe/badge/)](http://picaxe.readthedocs.io/en/latest/?badge)

[![Coverage Status](https://cdn.rawgit.com/thespacedoctor/picaxe/master/coverage.svg)](https://cdn.rawgit.com/thespacedoctor/picaxe/master/htmlcov/index.html)

*A python package and command-line tools for work with the Flickr API to upload images, sort images, generate MD image reference links etc*.

Here’s a summary of what’s included in the python package:

Command-Line Usage
==================

``` sourceCode
Documentation for picaxe can be found here: http://picaxe.readthedocs.org/en/stable

Usage:
    picaxe init
    picaxe auth [-s <pathToSettingsFile>]
    picaxe md <urlOrPhotoid> [<width>] [-s <pathToSettingsFile>]
    picaxe albums [-s <pathToSettingsFile>]

Options:
    init                  setup the polygot settings file for the first time
    auth                  authenticate picaxe against your flickr account
    md                    generate the MD reference link for the image in the given flickr URL
    albums                list all the albums in the flickr account

    <pathToSettingsFile>  path to the picaxe settings file
    <urlOrPhotoid>        the flickr URL or photoid
    <width>               pixel width resolution of the linked image. Default *original*. [75|100|150|240|320|500|640|800|1024|1600|2048]

    -h, --help            show this help message
    -v, --version         show version
    -s, --settings        the settings file
```

Installation
============

The easiest way to install picaxe is to use `pip`:

``` sourceCode
pip install picaxe
```

Or you can clone the [github repo](https://github.com/thespacedoctor/picaxe) and install from a local version of the code:

``` sourceCode
git clone git@github.com:thespacedoctor/picaxe.git
cd picaxe
python setup.py install
```

To upgrade to the latest version of picaxe use the command:

``` sourceCode
pip install picaxe --upgrade
```

Documentation
=============

Documentation for picaxe is hosted by [Read the Docs](http://picaxe.readthedocs.org/en/stable/) (last [stable version](http://picaxe.readthedocs.org/en/stable/) and [latest version](http://picaxe.readthedocs.org/en/latest/)).

Command-Line Tutorial
=====================

Before you begin using picaxe you’ll need to populate some custom settings within the picaxe settings file.

To setup the default settings file at `~/.config/picaxe/picaxe.yaml` run the command:

``` sourceCode
picaxe init
```

This should create and open the settings file; follow the instructions in the file to populate the missing settings values (usually given an `XXX` placeholder).

Authenticating Picaxe Against Your Flickr Account
-------------------------------------------------

In order to use picaxe for the first time you’ll need to first authenticate it against your Flickr account. This is to give picaxe permission to read your private photo metadata to generate markdown image links etc and also the ability to upload images and screengrabs to your various albums.

The `picaxe init` command should initiate the authentication process if you’re running picaxe for the first time, but if you need to run the authentication process again for any reason use:

``` sourceCode
picaxe auth
```

You should see something like this, and then your default browser *should* open at the URL presented (if not just copy and paste the URL into your browser):

``` sourceCode
Now to authorize picaxe against your personal flickr account
Navigate to https://www.flickr.com/services/oauth/authorize?perms=write&oauth_token=72157678178240312-c1e614c89bbfa330 and click on 'OK, I'LL AUTHOURIZE IT'
What is the oauth_verifier value in URL you where redirected to?
  > 
```

You’ll be presented with an authentication request like the one below. Click ‘OK, I’LL AUTHOURIZE IT’.

<img src="https://i.imgur.com/KMP8rEp.png" alt="picaxe authorisation request from flickr" width="800" />

You’ll then be redirected to *thespacedoctor* website and in the URL you’ll notice there are `oauth_token` and `oauth_verifier` parameters.

<img src="https://i.imgur.com/tOEyonj.png" alt="oauth_verifier in URL" width="800" />

Copy the `oauth_verifier` value, paste it into the terminal and hit return. That’s it. Simples. Your credientials are now written into the picaxe settings file which can be found at `~/.config/picaxe/picaxe.yaml`.

Listing Albums in Flickr Account
--------------------------------

To list all of the albums in your Flickr account run the command:

``` sourceCode
picaxe albums
```

This prints the titles of all the albums you have created in your Flickr account to stdout:

``` sourceCode
Auto Upload
home movies
projects: thespacedoctor
notes: images and screengrabs
blog: workflow tags
family photos 
```

Generating a Multi-Markdown Image Link from Any Flickr Image
------------------------------------------------------------

To generate a MMD image link for any image in your Flickr account (private or public), or any other public Flickr image, run the command:

``` sourceCode
picaxe md <urlOrPhotoid> 
```

Take [this image](https://www.flickr.com/photos/92344016@N06/30588492355/in/album-72157675576126786/) for example. To generate the MMD image link run:

``` sourceCode
picaxe md https://www.flickr.com/photos/92344016@N06/30588492355/in/album-72157675576126786/
```

or just quote the photo-id (*30588492355* in this case):

``` sourceCode
picaxe md 30588492355
```

Here’s the MMD link dumped to stdout:

``` sourceCode
![][Photoelectric effect 30588492355]

[Photoelectric effect 30588492355]: https://farm6.staticflickr.com/5722/30588492355_147111fcd3_o.png title="Photoelectric effect" width=600px 
```

Note the image reference is generatate from the image title (if there is one) and photo-id so should always be unique (i.e. no reference name clashes in your MMD documents).
