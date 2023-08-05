========
tinnitus
========
:Info: See <https://github.com/strangedev/tinnitus>.
:Author: Noah Hummel <strangedev@posteo.net>
:Date: $Date: 2017-02-21 01:10:53 +0000 (Tue, 21 Feb 2017) $
:Revision: $Revision: 1 $

Tinnitus is a media player and playback queue.

It comes in two parts, service and remote. Once the *tinnitusd* service is running, the Python remote can be used to
manipulate the queue and control playback. *tinnitusd* uses pluggable backends, which makes it easy to extend.
Tinnitus is *thread-safe*, meaning it can be accessed by any number of remotes at once.

.. NOTE::

    Please report any bugs over at <https://github.com/strangedev/tinnitus/issues>

Setup
^^^^^
Prerequisites: *git*, *pip* and *setuptools*

Get tinnitus via *git*:

.. code:: bash

    git clone https://github.com/strangedev/tinnitus.git

    cd tinnitus

Optinal: Activate the *virtualenv* you want to install tinnitus to.

.. code:: bash

    virtualenv .tinnitus

    . .tinnitus/bin/activate


Install tinnitus using *pip* and *setuptools*:

.. code:: bash

    pip install -e .

For a global installation (not using *virtualenv*), you'll most likely have to be *root*.

Running the service
^^^^^^^^^^^^^^^^^^^
After installing tinnitus, you can start the service with::

    tinnitusd [port]

``port`` is an optional parameter, by default, tinnitus runs on port 18861.

If you've installed tinnitus to a *virtualenv*, make sure to activate it first.

Remote
^^^^^^
To use the remote in your own project, install tinnitus to the same environment you're developing your project in.

You can then use the remote with the contextmanager protocol:

.. code:: python

    from tinnitus import remote

    with remote() as r:
        print(r.status())

You can also configure the remote to use a different network configuration:

.. code:: python

    import tinnitus

    tinnitus.configure(host="localhost", port=1337)

Supported actions are:

+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Adds an audio resource to the queue.                                      |
|                                          |                                                                           |
|                                          | ``resource_id`` is an int identifying each resource unqiuely.             |
|                                          |                                                                           |
|   r.add(resource_id, mrl, backend)       | ``mrl`` is a str containing the resource's location (and protocol)        |
|                                          |                                                                           |
|                                          | ``backend`` is the name of the backend which should handle the resource   |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Removes an audio resource from the queue.                                 |
|                                          |                                                                           |
|                                          | ``resource_id`` is an int identifying each resource unqiuely.             |
|                                          |                                                                           |
|   r.remove(resource_id)                  |                                                                           |
|                                          |                                                                           |
|                                          |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Removes all resources from the queue.                                     |
|                                          |                                                                           |
|   r.clear()                              |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Returns the ``resource_id`` of the currently playing resource.            |
|                                          |                                                                           |
|   r.current()                            |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Returns the ``resource_id`` s of all queued resources as a list.          |
|                                          |                                                                           |
|   r.queue()                              |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Starts playback, if the backend is paused or stopped.                     |
|                                          |                                                                           |
|   r.play()                               |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Pauses playback, if the backend is playing.                               |
|                                          |                                                                           |
|   r.pause()                              |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Stops playback, if the backend is playing or stopped.                     |
|                                          |                                                                           |
|   r.stop()                               |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Skips forward to the next queued resource and starts playing.             |
|                                          |                                                                           |
|   r.play_next()                          |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Returns the backend's status as either PLAYING, PAUSED or STOPPED.        |
|                                          |                                                                           |
|   r.status()                             | The Status enum is defined in ``tinnitus.Status``                         |
+------------------------------------------+---------------------------------------------------------------------------+

Pluggable backends
^^^^^^^^^^^^^^^^^^

Playback is handled by pluggable backends.

Tinnitus by default comes with a simple backend using libvlc. It is both
versatile and serves as an example for the plugin structure.

Plugins are Python packages (directories containing an __init__.py).

In order to create a plugin called ``my_backend``, follow these steps from the repo's root directory:

.. code:: bash

    cd plugins

    mkdir my_backend

    touch __init__.py

Your plugin should expose the following methods at module level (they should be located in ``__init__.py``), for it
to be recognized by the service:


+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Called before the plugin is used for the first time.                      |
|                                          |                                                                           |
|                                          | Use this method to perform any initialisation, if needed.                 |
|                                          |                                                                           |
|   init(callback)                         | ``callback`` is a method which your plugin should call once a resource    |
|                                          | has reached it's end, save it somewhere.                                  |
|                                          |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Called when a resource is loaded for playback. It passes the resources    |
|                                          | to your plugin so that your plugin can perform any setup needed to play   |
|                                          | the resource with the given mrl.                                          |
|                                          |                                                                           |
|                                          |                                                                           |
|   set_mrl(mrl)                           | ``mrl`` is the resources location (and protocol)                          |
|                                          |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Called when your plugin should start playing the resource given by        |
|                                          | ``set_mrl``.                                                              |
|                                          |                                                                           |
|                                          | Note: The method should be non-blocking.                                  |
|                                          |                                                                           |
|   play()                                 |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Called when your plugin should pause playback of the resource.            |
|                                          |                                                                           |
|                                          |                                                                           |
|                                          | Note: The method should be non-blocking.                                  |
|                                          |                                                                           |
|   pause()                                |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Called when your plugin should stop playback of the resource.             |
|                                          |                                                                           |
|                                          |                                                                           |
|                                          | Note: The method should be non-blocking.                                  |
|                                          |                                                                           |
|   stop()                                 |                                                                           |
+------------------------------------------+---------------------------------------------------------------------------+