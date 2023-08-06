Image4Layer
===========

Layer effects by pillow

Install
-------

.. code:: buildoutcfg

    pip install image4layer

Usage
-----

.. code:: python

    from PIL import Image
    from image4layer import Image4Layer

    source = Image.open("ducky.png")
    backdrop = Image.open("backdrop.png")

    Image4Layer.multiply(backdrop, source)
