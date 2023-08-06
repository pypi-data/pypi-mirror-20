Fynd Alohomora Package
======================

A python package for Fynd Alohomora connector.
This package is only for django framework.
Fynd alohomora is the centralized Authentication system for several applications of Fynd.


Usage
=====
**Import the module

from alohomora import check_if_authenticated

** Use it as a decorator

check_if_authenticated(state='some_state', permission='some_permission')
def some_method()
    """
    Your code
    """
    return something



SETTINGS
========

**Settings can be overridden.

    ALOHOMORA_REDIS_HOST: IP of the alohomora redis host.
    ALOHOMORA_REDIS_PORT: PORT of the alohomora redis host.
    ALOHOMORA_REDIS_DB: DB of the alohomora redis host.
    IS_AUTH_ENABLED: TO enable or disable alohomora auth system.
