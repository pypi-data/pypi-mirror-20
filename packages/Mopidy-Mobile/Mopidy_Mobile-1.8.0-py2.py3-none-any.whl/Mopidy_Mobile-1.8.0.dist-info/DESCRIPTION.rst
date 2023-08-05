Mopidy Mobile
========================================================================

Mopidy Mobile aims to be a simple, easy to use remote that lets you
fully control a Mopidy_ music server from your mobile device.  It is
available as a `Web client extension
<http://mopidy.readthedocs.org/en/latest/ext/web/>`_ and a `hybrid app
<http://en.wikipedia.org/wiki/HTML5_in_mobile_devices#Hybrid_Mobile_Apps>`_
for Android version 4.4 and higher.  Users of older Android versions
may still access the Web extension using Google's `Chrome browser
<https://play.google.com/store/apps/details?id=com.android.chrome>`_.
On Apple devices, the Web client should work with iOS 7 or higher.

In a nutshell, Mopidy Mobile lets you

- Browse and search your entire Mopidy music library.
- Search within selected directories only.
- Edit the tracks in the current tracklist.
- Create and edit playlists (requires Mopidy server v1.x).
- Download cover art from selected online resources.

Mopidy Mobile's user interface comes with both light and dark themes
to match your mood, and so far has been translated to English, German,
Spanish and Catalan.  Last but not least, it also features a beloved
80's arcade game character icon to represent Mopidy's consume mode.


Installation
------------------------------------------------------------------------

The Web extension can be installed from PyPi_ by running::

  pip install Mopidy-Mobile

The Android app is available from the `Google Play
<https://play.google.com/store/apps/details?id=at.co.kemmer.mopidy_mobile>`_
store.  You may also join the `Beta testing program
<https://play.google.com/apps/testing/at.co.kemmer.mopidy_mobile>`_ to
preview unreleased versions.

Note that the Web client is designed to be added to your home screen,
so it is launched in full-screen "app mode".  In fact, the only major
difference between the Web client and the hybrid app is that the app
will let you manage multiple Mopidy server instances.  Other than
that, they are functionally equivalent.  If you don't know how to add
a Web application to your home screen, there are plenty of
instructions available online for both `Android
<https://www.google.at/search?q=android+chrome+add+to+homescreen>`_
and `iOS
<https://www.google.at/search?q=ios+safari+add+to+homescreen>`_.


Configuration
------------------------------------------------------------------------

The following configuration values are available for the Web
extension:

- ``mobile/enabled``: Whether the Mopidy Mobile Web extension should
  be enabled.  Defaults to ``true``.

- ``mobile/title``: The Web application's title, which will also be
  displayed when added to your home screen.  The variables
  ``$hostname`` and ``$port`` can be used in the title.  Defaults to
  ``Mopidy Mobile on $hostname``.

- ``mobile/ws_url``: The WebSocket URL used to connect to your Mopidy
  server.  Set this if Mopidy's WebSocket is not available at its
  default path ``/mopidy/ws/``, for example when using a reverse
  proxy.


Building from Source
------------------------------------------------------------------------

Mopidy Mobile is built using `Ionic <http://ionicframework.com/>`_,
`AngularJS <https://angularjs.org/>`_ and `Apache Cordova
<http://cordova.apache.org/>`_, so it is recommended to familiarize
yourself with these before you start.

To build the Mopidy Web extension, you need to have `npm
<http://www.npmjs.org/>`_ and `gulp <http://gulpjs.com/>`_ installed.
Then run::

  npm install
  gulp install
  gulp dist
  pip install --editable .

To build the hybrid app for Android, please follow Ionic's
`installation guide
<http://ionicframework.com/docs/guide/installation.html>`_ to make
sure you have everything needed for Android development.  Then, in
addition to the commands above, run::

  ionic platform add android
  ionic run android


Project Resources
------------------------------------------------------------------------

.. image:: http://img.shields.io/pypi/v/Mopidy-Mobile.svg?style=flat
    :target: https://pypi.python.org/pypi/Mopidy-Mobile/
    :alt: Latest PyPI version

.. image:: http://img.shields.io/travis/tkem/mopidy-mobile/master.svg?style=flat
    :target: https://travis-ci.org/tkem/mopidy-mobile/
    :alt: Travis CI build status

- `Issue Tracker`_
- `Source Code`_
- `Change Log`_


License
------------------------------------------------------------------------

Copyright (c) 2015-2017 Thomas Kemmer.

Licensed under the `Apache License, Version 2.0`_.


.. _Mopidy: http://www.mopidy.com/

.. _PyPI: https://pypi.python.org/pypi/Mopidy-Mobile/
.. _Issue Tracker: https://github.com/tkem/mopidy-mobile/issues/
.. _Source Code: https://github.com/tkem/mopidy-mobile/
.. _Change Log: https://github.com/tkem/mopidy-mobile/blob/master/CHANGES.rst

.. _Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0


