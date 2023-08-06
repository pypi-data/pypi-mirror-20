AP
##

AP powers-up commands with AWS profile, assume-role and MFA functionality.

e.g::

    ap myCrossAccountProfile some command

(Your command must support standard AWS environment variables: ``AWS_ACCESS_KEY_ID``, ``AWS_SECRET_ACCESS_KEY`` and ``AWS_SECURITY_TOKEN``.)


Installation
------------

``pip install ap``


Help! It keeps asking for my MFA code
-------------------------------------

``ap`` asks for an MFA code every time if enabled on a cross-account role.

Use ``--cached`` to store MFA for 60 minutes, e.g::

    ap --cached myCrossAccountProfile some command
