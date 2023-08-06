# django-model-logging

Logging for changes made to Django model instances.

## Installation

`pip install django-model-logging`

Add `model_logging` to your `INSTALLED_APPS`.

## Usage

#### Low-level use

```python
from model_logging.models import LogEntry

LogEntry.objects.log(
    log_entry_creator,
    operation,
    model,
    user,
    json_data,
)
```

The parameters are as follows:

* `log_entry_creator`:  The user who made this change.
* `operation`:  One of `LogEntry.OPERATION_ADDED`, `LogEntry.OPERATION_REMOVED`,
or `LogEntry.OPERATION_MODIFIED`.
* `model`:  The path to the model being logged (e.g. 'users.models.User').
* `user`:  The user to which the model instance belongs.
* `json_data`:  A full or partial JSON representation of data on the model instance.

#### Medium-level use

To add methods to a view(set) that can be used to straightforwardly log changes:

```python
from model_logging.views import LoggingMethodMixin

class AViewOrViewset(LoggingMethodMixin, ModelViewSet):
    def _get_logging_user(self):
        # Override this method to return a suitable
        # value for the `user` parameter above.
        return self.instance.user  # or similar

    def extra_data(self):
        # Overriding this isn't mandatory, it's just a hook
        return {'any additional data': 'you wish to log'}
```

The class now has access to the following:

```python
def log(self, operation, data):
    # A simplified version of LogEntry.objects.log,
    # with some parameters pre-filled. The return
    # value of extra_data() will be added to the
    # supplied data.

def _log_on_create(self, serializer):
    # Log a LogEntry.OPERATION_ADDED change, using
    # the log() method above.

def _log_on_update(self, serializer):
    # Log a LogEntry.OPERATION_MODIFIED change, using
    # the log() method above.

def _log_on_destroy(self, instance):
    # Log a LogEntry.OPERATION_DELETED change, using
    # the log() method above.
```

More abstract still:

#### High-level use

A viewset can log its own changes!

```python
from model_logging.views import LoggingViewSetMixin

class AVeryShinyViewSet(LoggingViewSetMixin, ModelViewSet):
    def _get_logging_user(self):
        # Override this method to return a suitable
        # value for the `user` parameter above.
        return self.instance.user  # or similar

    def extra_data(self):
        # Overriding this isn't mandatory, it's just a hook
        return {'any additional data': 'you wish to log'}
```

This mixin is a wrapper around `LoggingMethodMixin` that calls the appropriate logging
methods during `perform_create`, `perform_update` and `perform_destroy`.


