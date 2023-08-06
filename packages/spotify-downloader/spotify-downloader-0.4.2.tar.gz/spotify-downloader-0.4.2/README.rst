spotify-dl
========================

A command line utility to download albums on Spotify via youtube-dl.


Install
^^^^^^^

::

    pip install spotify-downloader



Usage
^^^^^

::

    usage: spotify-dl [-h] album_id

    positional arguments:
      album_id    The Spotify ID for the album.

    optional arguments:
      -h, --help  show this help message and exit

Example
^^^^^^^

::

    spotify-dl 60cRh5MCFNOrFeQykKnDej


Developing locally
^^^^^^^^^^^^^^^^^^

::

    git clone https://github.com/AnthonyBloomer/spotify-dl.git && cd spotify-dl
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt
    python setup.py install
    



