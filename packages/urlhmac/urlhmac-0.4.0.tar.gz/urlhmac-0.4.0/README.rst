urlhmac
=======

Library to sign requests based on hmac

Specification
-------------

May `url` be the full url to sign.  Then signed url is:

`timestamped_url` := `{url}{sep}e={e}`
`signed_url` := `{}&s={s}`

Where:
 * `sep` is `?` if url does not contain a `?` otherwise a `&`
 * `e` is expiry time as unix timestamp
 * `s` is Signature: `rstrip(base64url(hmac(sha256, timestamped_url, key)), '=')`. Meaning the `timestamped_url` is signed via hmac using sha256 and the result is base64 encoded using the url-safe alphabet as suggeted in rfc4648.  Lastly the not-url-safe `=` padding is removed from the result.


Implementations
---------------

 * Python `urlhmac <read the docs>`_. / `pip install urlhmac`
 * PHP `urlhmac.php <urlhmac.php>`_.


TODO
====

 * java / android implementation
 * specification for POST requests
