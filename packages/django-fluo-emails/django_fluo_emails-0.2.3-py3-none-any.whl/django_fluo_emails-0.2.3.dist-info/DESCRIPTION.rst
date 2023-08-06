# django-fluo-emails #

Simple emails template system db-dased and optional email db backend.


## Install ##

### DB Templates ###
Add `emails.apps.EmailsConfig` into your `INSTALLED_APPS`

```
#!python
INSTALLED_APPS = [
    ...
    "emails.apps.EmailsConfig",
    ...
]
```

### Email backend ###

Set `EMAIL_BACKEND` to `'emails.backend.EmailBackend'`

```
#!python
EMAIL_BACKEND = 'emails.backend.EmailBackend'
```
Now every email is archived on db.


## Usage ##

```
#!python
from emails.models import EmailTemplate

template = EmailTemplate.objects.get(name="myemail")
email = template.send(to=["receiver@example.com"])
```


## CHANGES ##


0.2.0
=====


* drop python2 support
* support for django 1.10


