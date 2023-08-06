media-transporter
=================

Manages the transportation of TV/Movie files to a mountable media share.

Contributers:
^^^^^^^^^^^^^

-  Steve Coward (stevesugarstack.io)

media-transporter is a project that arose out of laziness and boredom,
mainly. There are plenty of similar or fully-featured alternatives like
SickBeard and others, but I already had an existing workflow for:

-  Polling RSS feeds and downloading torrent files
   (`Otomatic <http://codingcurious.com/otomatic>`__).
-  Automatic watching of a folder for torrents and auto-adding to a
   torrent client (`Transmission <https://transmissionbt.com>`__).

The last piece involved the need to move completed downloads to my NAS.
Enter ``media-transporter``. Here's how it works:

-  Create ``config.py`` in a directory of your choosing. Use
   ``config_example.py`` as a template. The main options are
   ``media_shares``, ``download_path``, and ``unrar_path``. Adjust these
   to match the path to your media share, where you have finished
   downloads, and the **absolute** path to the ``unrar`` binary. The
   ``share_[tv|movie]_*`` config options point to the path on your media
   share where TV and Movies are stored.
-  ``media-transporter`` requires one command line argument. ``-c``
   should be the *absolute* path to your ``config.py`` file.
-  When executed (preferably automatically after a torrent is completed
   (Transmission is built to support this, for example)),
   ``media-transporter`` determines if your configured media share is
   within an acceptable range for storage capacity (configured in
   ``config.py``).
-  If it is, ``media-transporter`` checks your Downloads folder for
   media files and folders, and intelligently moves each of them to
   their appropriate destination on your media share.
-  Logs are written to the value of ``log file`` to record all actions
   taken during processing. Useful for debugging.

The idea is that ``media-transporter`` will be able to be used on
multiple platforms, including Windows. At the moment,
``media-transporter`` has only been tested on OS X and Linux, but it
should be feasible to support Windows very easily.

Requirements
------------

-  Python 2.\*
-  ``unrar`` via either apt-get/yum (Linux), homebrew (OS X), WinRAR
   (Windows)

Installation
------------

.. code:: sh

    $ pip install transporter

.. code:: sh

    $ python setup.py install

Things to do
------------

-  Code cleanup. Plenty of stuff to do. This wasn't originally meant for
   public distribution.
-  Support and test script on Windows.
