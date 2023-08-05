challonge2elo
=============

This script implements the Elo rating system for Challonge tournament results. The ratings are output to a CSV file, and they are also saved in a JSON file so that you can go back and update them later with future tournament results.

Note that this script relies on players having the same name for each tournament. If you are a tournament organizer, make sure your naming scheme is consistent!

Installation
------------

.. code-block:: bash

    $ pip install challonge2elo

Configuration
-------------

Log in to your Challonge account and `get your API key <https://challonge.com/settings/developer>`_. Then export your username and API key as environment variables:

.. code-block:: bash

    $ export CHALLONGE_USERNAME="<Your Challonge username>"
    $ export CHALLONGE_API_KEY="<Your Challonge API key>"

Usage
-----

Create your ratings by passing tournament IDs:

.. code-block:: bash

    $ challonge2elo ggsmash-116_smash4 ggsmash-416_smash4
