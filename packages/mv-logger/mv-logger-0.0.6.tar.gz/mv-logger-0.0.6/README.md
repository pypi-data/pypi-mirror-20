# mv-logger

To install: 

```
pip install mv-logger
```

To use in django:

```
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'root': {
            'level': 'INFO',
            'handlers': ['file'],
            'propagate': False,
        },
        'formatters': {
            'logstash': {
                '()': 'mv_logger.LogstashFormatter',
            },
        },
        'handlers': {
            'file': {
                'class': 'logging.FileHandler',
                'formatter': 'logstash',
                'level': 'INFO',
                'filename': '/var/log/app.log,
            },
        },
    }
```
