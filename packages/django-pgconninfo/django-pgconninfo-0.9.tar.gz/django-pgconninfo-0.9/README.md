# django-pgconninfo

Some code to pick up database configuration from environment variables and
construct maps suitable for assignment to Django `DATABASES`. This code can
handle Heroku, Amazon Elastic Beanstalk, PostgreSQL service files
(`.pg_service.conf`), PostgreSQL password files (`.pgpass`), and regular `libpq`
variables.

To use the default engine (psycopg2):

    DATABASES = {
        'default': pg_conninfo()
    }

or, to use an alternative engine, explicitly state the engine class:

    DATABASES = {
        'default': pg_conninfo('django.contrib.gis.db.backends.postgis')
    }
