# OpenFisca Web-API

[![Build Status](https://travis-ci.org/openfisca/openfisca-web-api.svg?branch=master)](https://travis-ci.org/openfisca/openfisca-web-api)

[More build statuses](http://www.openfisca.fr/build-status)

[OpenFisca](http://www.openfisca.fr/) is a versatile microsimulation free software.
This is the source code of the Web-API module.

The documentation of the project is hosted at http://doc.openfisca.fr/

## Local install

If you want to run the Web API on your machine, follow these steps.

```
git clone https://github.com/openfisca/openfisca-web-api.git
cd openfisca-web-api
```

Optional: at this point if you work with [Python virtualenvs](http://virtualenvwrapper.readthedocs.io/en/latest/),
you can activate it. Example with a virtualenv named `openfisca`:

```
workon openfisca
```

Then you can ensure you have the latest version of `pip`:

```
pip install --upgrade pip wheel
```

Then you can install OpenFisca-Web-API. We tell `pip` we want to install the extra requirements
`paster` (the local HTTP server) and `france` (OpenFisca-France) all described in `setup.py`.

```
pip install --editable .[paster,france]
python setup.py compile_catalog
```

## Run the HTTP server

```
paster serve --reload development-france.ini
```

To check if it's OK, open the following URL in your browser: http://localhost:2000/

> 2000 is the port number defined in the development-france.ini config file.

You should see this JSON response:

    {"apiVersion": 1, "message": "Welcome, this is OpenFisca Web API.", "method": "/"}

## Code architecture

Each API endpoint (`calculate`, `simulate`, etc.) source code has its own controller
(a function responding to a HTTP request) in `openfisca_web_api/controllers`.

Each controller function consists basically of 3 steps:
- reading and validating user input (with `req.params`)
- doing some computations
- returning the results in JSON (with `wsgihelpers.respond_json`)

The configuration of the application is stored in `development-<country>.ini` files, `<country>` being either
`france` or `tunisia`.
The configuration is validated once when the application starts.
The validation code is in `openfisca_web_api/environment.py` at the beginning of the `load_environment` function.

The tests are in `openfisca_web_api/tests`.

The function `make_app` in `openfisca_web_api/application.py` returns a [WSGI](http://wsgi.readthedocs.org/) application.
It is the main entry point of the application and is declared in `setup.py`.

All conversion and validation steps are done using the [Biryani](https://biryani.readthedocs.org) library.

## Test

If you installed OpenFisca-Web-API from Git you can run the unit tests:

```
make test
```

## Examples

See the [examples directory](./examples/).

## Deploy in production

Here we use Apache with `mod_wsgi` under Debian Jessie but you may want to use another web server like Nginx.

```
# aptitude install apache2 libapache2-mod-wsgi
```

Then create a vhost, for example (adapt to your domain name and paths):

```
WSGIDaemonProcess api.openfisca.fr display-name=api

<VirtualHost *:80>
    ServerName api.openfisca.fr
    ServerAdmin webmaster+api@openfisca.fr

    ErrorLog /var/log/apache2/api.openfisca.fr.error.log
    # NCSA extended/combined log format.
    LogFormat "%V %{X-Forwarded-For}i %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""
    TransferLog /var/log/apache2/api.openfisca.fr.access.log
    # Possible values include: debug, info, notice, warn, error, crit, alert, emerg.
    LogLevel notice

    # Required to avoid an infinite loop when calling any API URL without importing Pandas.
    # Seems to be a numpy or scipy related bug.
    # Without this line, we get a "Premature end of script headers: application.py" error.
    WSGIApplicationGroup %{GLOBAL}
    WSGIProcessGroup api.openfisca.fr
    WSGIScriptAlias / /home/openfisca/vhosts/api.openfisca.fr/config/application.py

    Alias /robots.txt /home/openfisca/vhosts/api.openfisca.fr/static/robots.txt
</VirtualHost>
```

```
# ln -s /path/to/apache2.conf /etc/apache2/sites-available/api.openfisca.fr.conf
# a2ensite api.openfisca.fr.conf
# service apache2 force-reload
```