Isight
-------


 To use this module simply do::

    >>> from isight import Isight
    >>> api_query = Isight()
    >>> api_query.public_key = '<iSIGHT public key>'
    >>> api_query.private_key = '<iSIGHT private key>'
    >>> api_query.querySIGHT('<query>')


Query
------

The query can be one of the following 

- Hash 
- File name 
- Domain 
- IP
- The module accpets either single quires or list submissions
