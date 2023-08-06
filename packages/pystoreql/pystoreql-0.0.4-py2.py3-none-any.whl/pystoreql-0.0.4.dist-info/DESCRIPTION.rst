pystoreql: A command line tool to easily share pastes and files.
================================================================

1. Why ``pystoreql``?:
======================

``pystoreql`` (*py-store-q-l*) lets you share pastes, files and directories easily and let you choose the name (``id``) (could be easy to be remembered) for the paste/file/directory being shared. Everyone who has the ``id`` can download the paste/file/directory easily by typing a simple command (e.g., ``pystoreql get <id>``) without opening a web browser. Read more below to find out how to use ``pystoreql``.

Features:
---------

* Anonymous sharing: No need to register to post, upload, download.
* Easy to use: Simply typing a command v.s. opening a web browser or using a graphic interface clients.
* Unlimited: In theory, there should be no limit on the number and the size of pastes or files you can share.
* Possible to host and use your own ``pystoreql`` server with the same command line interface like ``git``.
* More features will be coming as users suggest.

To do:
------

* Writing tests
* Web interface (maybe)
* Better support for Windows and MacOS. 
* Phone applications i.e., Android, iOS, ... (unlikely)

2. Paste sharing:
=================

The two main sub-commands for paste sharing are ``post`` and ``get``. To share a paste and assign it an ``id`` (e.g., ``your_wanted_id``)::

  $ pystoreql post your_wanted_id "the paste string"

or::

  $ cat your_file.txt > pystoreql post your_wanted_id

To retrieve a paste with a given ``id`` (e.g., ``the_id``)::

  $ pystoreql get the_id

To retrieve a paste with a given id (e.g., ``the_id``) and save it to a file (e.g., ``filename.txt``) ::

  $ pystoreql get the_id > filename.txt  


3. File and directory sharing:
==============================

The two main sub-commands for file and directory sharing are ``push`` and ``pull``. To share a file or a directory and assign it an ``id`` (e.g., ``your_wanted_id``)::

  $ pystoreql push your_wanted_id the_file_or_dir_path

To retrieve a file or a directory with a given ``id`` (e.g., ``the_id``) to the current working directory::

  $ pystoreql pull the_id

4. Command line interface:
==========================

::

  $ pystoreql --help
  Usage:
    pystoreql get <id>
    pystoreql post <id> <value>
    pystoreql pull <id>
    pystoreql push <id> <file_or_dir>

5. Contributing:
=================

The source code is available at: https://github.com/hieu-n/pystoreql

Please fork, modify and make pull requests. New contributors are more than welcome.


