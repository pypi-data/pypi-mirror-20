# AGM library

### Example usage
```
>>> from actagm.agm_helper import AgmHelper
>>> ah = AgmHelper(<dns name or ip address>, <user>, <password>)
>>> ah.login()
>>> r = ah.get('/cluster')
>>> print(r.json())
```

### Platform Dependant Requirements
AgmHelper requires openssl version 1.0.1+ for TLSv1.2. We do not backport ssl so python 2.7.9+ or 3.4+ is required.


