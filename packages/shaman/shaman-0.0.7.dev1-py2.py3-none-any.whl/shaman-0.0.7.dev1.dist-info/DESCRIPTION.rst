This is the documentation for the Shaman. Multiprocessing application to combine different singular handlers against one message.

The initial purpose was to create a tool, that:
    - would make possible to download and analyze a content of an html pages.
    - simple enough to add a new functionality in it.
    - hast to be scalable (multiprocessing).
Actual usage can be different from it. There are some spontaneous ideas:
    - scanning a mongo collection and parsing documents in parallel
    - parsing a lot of lines from multiple huge files, saving the results to any database (depending on the results)

There are three parts in the shaman library:

    * stages (actual processors, which do represent some functionality)
    * consumer (worker, that run them all in a particular order)
    * daemon (run as many as needed workers. Also used as a CLI unstrument.)
    All stages are run in a particular order and use the same message object (inside one worker).

INSTALLATION:
-------------

.. code::

    pip install shaman

If everything is ok, you should be able to run:

.. code::

    shaman --help

It has to display:

.. code:: python


    usage: shaman [-h] [-i | -d] -c CONFIGURATION [--drop_first DROP_FIRST]
                  [-p PRINT_FIELDS [PRINT_FIELDS ...]]
                  [-r REMOVE_FIELDS [REMOVE_FIELDS ...]]
                  [--ignore_after IGNORE_AFTER]
                  [{stop,start,restart,} [{stop,start,restart,} ...]]

    Main shaman module. Use it to start|stop|restart daemon or start non-daemon
    modes of shaman

    positional arguments:
     {stop,start,restart,}
                             Command to daemon (default: )

    optional arguments:
     -h, --help            show this help message and exit
     -i                    Use stdin input as main input (default: False)
     -d                    Daemonize main process (default: False)
     -c CONFIGURATION      Path to configuration file (default: None)
     --drop_first DROP_FIRST
                           drop first lines (default: 0)
     -p PRINT_FIELDS [PRINT_FIELDS ...], --print_fields PRINT_FIELDS [PRINT_FIELDS ...]
     -r REMOVE_FIELDS [REMOVE_FIELDS ...], --remove_fields REMOVE_FIELDS [REMOVE_FIELDS ...]
     --ignore_after IGNORE_AFTER

CONFIGURATION:
--------------



You may find an example configuration file in <path_to_python_lib>/site-packages/shaman/etc/crawler.config
It includes 4 stages:

.. code::

    reading from stdin
    downloading page
    detecting charset
    print url, charset

By default, all stages reside in <path_to_python_lib>/site-packages/shaman/src/analyzers/ folder.
You may create your custom stage and put it into the custom folder.
There is a parameter in a configuration file:

    custom_stage_dir = <custom_folder>

If you put some stages into this folder, shaman will also "see" them.

To check if anything is working, please, run:
.. code::

    echo "http://google.ru" | shaman -c <path_to_config> -i

More information about the package:
`http://shaman.readthedocs.io/en/latest/`_.
Github:
`https://github.com/Landish145/shaman`_.


