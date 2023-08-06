========
tinnitus
========
:Info: See <https://github.com/strangedev/tinnitus>.
:Author: Noah Hummel <strangedev@posteo.net>
:Date: $Date: 2017-02-21 01:10:53 +0000 (Tue, 21 Feb 2017) $
:Revision: $Revision: 3 $

.. image:: https://badge.fury.io/py/tinnitus.svg
    :target: https://badge.fury.io/py/tinnitus

Tinnitus is a media player and playback queue.

It comes in two parts, service and remote. Once the *tinnitusd* service is running, the Python remote can be used to
manipulate the queue and control playback. *tinnitusd* uses pluggable backends, which makes it easy to extend.
Tinnitus is *thread-safe*, meaning it can be accessed by any number of remotes at once.

.. NOTE::

    Please report any bugs over at <https://github.com/strangedev/tinnitus/issues>

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
| .. code:: python                         | Returns a boolean indicating whether the resource specified by ``mrl``    |
|                                          | is available for playback with the specified backend.                     |
|                                          |                                                                           |
|                                          | Note: This method does not indicate whether the backend is appropriate    |
|   r.available(mrl, backend)              | for the resource.                                                         |
|                                          |                                                                           |
|                                          | Note: This feature is optional, the remote may return NotImplemented if   |
|                                          | it is not supported by the backend.                                       |
+------------------------------------------+---------------------------------------------------------------------------+

Pluggable backends
^^^^^^^^^^^^^^^^^^

Playback is handled by pluggable backends. Plugins are Python scripts and can be located anywhere.

Tinnitus by default comes with a simple backend using libvlc. It is both versatile and serves as an example
for the plugin structure.

In order to create a plugin called ``my_backend``, follow these steps:

If you haven't set up a plugin directory before or want to create a separate one:

#. Create a plugin directory anywhere on your system, for example ``~/tinnitus_plugins/`` .
#. Use the included ``tinnitus-include`` command to point tinnitusd to your directory:

.. code:: bash

    tinnitus-include add ~/tinnitus_plugins

You can use any number of plugin directories. To list all used plugin directories, use:

.. code:: bash

    tinnitus-include list

To remove a plugin directory, for example ``~/tinnitus_plugins/``, from tinnitusd, use:

.. code:: bash

    tinnitus-include rem ~/tinnitus_plugins

If you've created a plugin directory as described above, you can then create a file named ``my_backend.py``
inside your plugin directory.

Your plugin should expose the following methods, for it to be recognized by the service:


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

Your plugin may also optionally expose any of these methods, to support more remote features:

+------------------------------------------+---------------------------------------------------------------------------+
| .. code:: python                         | Returns a boolean indicating whether the resource specified by ``mrl``    |
|                                          | is available for playback. For example, if ``mrl`` points to a local      |
|                                          | file, your plugin should check if the local file exits.                   |
|                                          |                                                                           |
|                                          | This feature is exposed as remote.available(). If your plugin doesn't     |
|   available(mrl, backend)                | implement this method, the return value will default to NotImplemented.   |
+------------------------------------------+---------------------------------------------------------------------------+