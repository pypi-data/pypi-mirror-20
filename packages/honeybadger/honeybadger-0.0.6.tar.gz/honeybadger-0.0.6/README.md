# Honeybadger for Python
[![Build Status](https://travis-ci.org/honeybadger-io/honeybadger-python.svg?branch=master)](https://travis-ci.org/honeybadger-io/honeybadger-python)

When any uncaught exceptions occur, Honeybadger will send the data off to the Honeybadger server specified in your environment.

## Supported Versions

Tested with Django 1.9 and 1.10 and Python 2.7 through 3.5. Django integration is done via middleware and will work out of the box up to version 1.10.

## Getting Started

Honeybadger for Python works out of the box with Django with only a few configuration options required. The following is a basic setup - more advanced setup will be described later.

### Install Honeybadger

Install honeybadger with pip.

`$ pip install honeybadger`


### Django

*NOTE: Middleware configuration has changed in Django 1.10. Instead of using `MIDDLEWARE_CLASSES`, simply use the `MIDDLEWARE` configuration instead.*

In a Django application, add the Honeybadger Django middleware to *the top* of your `MIDDLEWARE_CLASSES` config variable:

```python
MIDDLEWARE_CLASSES = (
  'honeybadger.middleware.DjangoHoneybadgerMiddleware',
  ...
)
```

It's important that the Honeybadger middleware is at the top, so that it wraps the entire request process, including all other middlewares.

You'll also need to add a new `HONEYBADGER` config variable to your `settings.py` to specify your API key:

```python
HONEYBADGER = {
  'API_KEY': 'myapikey'
}
```


### Other frameworks / plain Python app

Django is the only explicitly supported framework at the moment. For other frameworks (Flask, web2py, etc.) or a plain Python script, simply import honeybadger and configure it with your API key. Honeybadger uses a global exception hook to automatically report any uncaught exceptions.

```python
from honeybadger import honeybadger
honeybadger.configure(api_key='myapikey')

raise Exception, "This will get reported!"
```

### All set!

That's it! For additional configuration options, keep reading.

## Logging

By default, Honeybadger uses the `logging.NullHandler` for logging so it doesn't make any assumptions about your logging setup. In Django, add a `honeybadger` section to your `LOGGING` config to enable Honeybadger logging. For example:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/path/to/django/debug.log',
        },
    },
    'loggers': {
        'honeybadger': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

For other frameworks or a plain Python script, you can use `logging.dictConfig` or explicitly configure it like so:

```python
import logging
logging.getLogger('honeybadger').addHandler(logging.StreamHandler())
```

## Configuration

To set configuration options, use the `honeybadger.configure` method, like so:

```python
honeybadger.configure(api_key='your api key', environment='production')
```

All of Honeybadger's configuration options can also be set via environment variables with the `HONEYBADGER` prefix (12-factor style). For example, the `api_key` option can be set via the `HONEYBADGER_API_KEY` environment variable.

The following options are available to you:

|  Name | Type | Default | Example | Environment variable |
| ----- | ---- | ------- | ------- | -------------------- |
| api_key | `str` | `""` | `"badgers"` | `HONEYBADGER_API_KEY` |
| project_root | `str` | The current working directory | `"/path/to/project"` | `HONEYBADGER_PROJECT_ROOT` |
| environment | `str` | `"production"` | `"staging"` | `HONEYBADGER_ENVIRONMENT` |
| hostname | `str` | The hostname of the current server. | `"badger01"` | `HONEYBADGER_HOSTNAME` |
| endpoint | `str` | `"https://api.honeybadger.io"` | `"https://honeybadger.example.com/"` | `HONEYBADGER_ENDPOINT` |
| params_filters | `list` | `['password', 'password_confirmation', 'credit_card']` | `['super', 'secret', 'keys']` | `HONEYBADGER_PARAMS_FILTERS` |

## Public Methods

### `honeybadger.set_context`: Set global context data

This method allows you to send additional information to the Honeybadger API to assist in debugging. This method sets global context data and is additive  - eg. every time you call it, it adds to the existing set unless you call `reset_context`, documented below.

#### Examples:

```python
from honeybadger import honeybadger
honeybadger.set_context(my_data='my_value')
```

### `honeybadger.reset_context`: Clear global context data

This method clears the global context dictionary.

#### Examples:

```python
from honeybadger import honeybadger
honeybadger.reset_context()
```

### `honeybadger.context`: Python context manager interface

What if you don't want to set global context data? You can use Python context managers to set case-specific contextual information.

#### Examples:

```python
# from a Django view
from honeybadger import honeybadger
def my_view(request):
  with honeybadger.context(user_email=request.POST.get('user_email', None)):
    form = UserForm(request.POST)
    ...
```

### `honeybadger.configure`: Specify additional configuration options

Allows you to configure honeybadger within your code. Accepts any of the above-listed configuration options as keyword arguments.

#### Example:

```python
honeybadger.configure(api_key='myapikey', project_root='/home/dave/crywolf-django')
```

### `honeybadger.notify`: Send an error notice to Honeybadger

In cases where you'd like to manually send error notices to Honeybadger, this is what you're looking for. You can either pass it an exception as the first argument, or an `error_class`/`error_message` pair of keyword arguments. You can also pass it a custom context dictionary which will get merged with the global context.

#### Examples:

```python
# with an exception
mydict = dict(a=1)
try:
  print mydict['b']
except KeyError, exc:
  honeybadger.notify(exc, context={'foo': 'bar'})

# with custom arguments
honeybadger.notify(error_class='ValueError', error_message='Something bad happened!')
```

## Development

After cloning the repo, run:

```sh
python setup.py develop
```

To run the unit tests:

```sh
python setup.py test
```

## Contributing

If you're adding a new feature, please [submit an issue](https://github.com/honeybadger-io/honeybadger-python/issues/new) as a preliminary step; that way you can be (moderately) sure that your pull request will be accepted.

### To contribute your code:

1. Fork it.
2. Create a topic branch `git checkout -b my_branch`
3. Commit your changes `git commit -am "Boom"`
3. Push to your branch `git push origin my_branch`
4. Send a [pull request](https://github.com/honeybadger-io/honeybadger-python/pulls)

## Changelog

See https://github.com/honeybadger-io/honeybadger-python/blob/master/CHANGELOG.md

## License

This project is MIT licensed. See the [LICENSE](https://github.com/honeybadger-io/honeybadger-python/blob/master/LICENSE) file in this repository for details.
