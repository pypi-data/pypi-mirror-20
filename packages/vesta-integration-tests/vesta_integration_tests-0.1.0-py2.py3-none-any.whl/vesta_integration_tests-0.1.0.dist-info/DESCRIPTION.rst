Integration tests to check proper interaction between Vesta Services components.

Usage
-----

Beforehand, you need to configure these tests by defining a python configuration module as defined by the VestaRestPackage configuration handler as described `here <http://services.vesta.crim.ca/docs/vrp/latest/configuration.html#configuration>`_.

Once that is done, you can launch one of the multiple sub tests from the
following : 

- vesta_integration_tests/mss_simple.py
- vesta_integration_tests/mss_test.py
- vesta_integration_tests/sg_test.py
- vesta_integration_tests/global_test.py

with a command similar to :

.. code-block:: bash

   python -m vesta_integration_tests.mss_simple




History
=======

0.1.0
---------------------

* First structured release.


