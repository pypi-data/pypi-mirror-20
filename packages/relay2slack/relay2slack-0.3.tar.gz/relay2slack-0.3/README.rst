relay2slack
======

relay2slack is a tool for capturing and forwarding incoming Slack webhook events.


Installation
------------
To install relay2slack, simply:

.. code-block:: bash

    $ pip install relay2slack

To run relay2slack in the foreground:

.. code-block:: bash

    $ relay2slack

If you would like to daemonize relay2slack, refer to `docs/ <docs/>`_ for supported methods.


Usage
-----
For whichever service you would like to product webhook events, instead point it to http://localhost:5000/relay with the normal JSON object you expect to send to Slack. For example:

.. code-block:: bash

    curl -X POST -d 'payload={"channel":"@blaketmiller","username":"My service","icon_emoji":":warning:","text":"Hello world"}' http://localhost:5000/relay

relay2slack receives that request and forwards the posted JSON object onto the actual Slack webhook endpoint that you provide it in `SLACK_TOKEN`.
