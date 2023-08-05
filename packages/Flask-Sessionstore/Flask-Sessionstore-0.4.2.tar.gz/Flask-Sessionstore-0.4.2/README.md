Flask-Session
=============
This project is a hard fork of the orphaned Flask-Session project at https://github.com/fengsp/flask-session

[![Build Status](https://travis-ci.org/mcrowson/flask-session.svg?branch=master)](https://travis-ci.org/mcrowson/flask-session)
[![Documentation Status](https://readthedocs.org/projects/flask-sessionstore/badge/?version=latest)](http://flask-sessionstore.readthedocs.io/en/latest/?badge=latest)
[![Coverage Status](https://coveralls.io/repos/github/mcrowson/flask-session/badge.svg)](https://coveralls.io/github/mcrowson/flask-session) 


[![Code Issues](https://www.quantifiedcode.com/api/v1/project/df2c3cad886341899a8e5e2c0fd1a047/badge.svg)](https://www.quantifiedcode.com/app/project/df2c3cad886341899a8e5e2c0fd1a047)

Flask-Sessionstore is an extension for Flask that adds support for Server-side Session to your application.

pip install flask-sessionstore

## Testing
Tests require a running version of MongoDB, Redis, and Memcached. The easiest way to get those 
is via docker-compose. 
```bash
$ docker-compose up -d
$ nosetests --with-timer
$ docker-compose down
```

This starts up the services, runs the tests, and then stops and removes the docker images. 
If you would like to test the project against all supported python versions, please use 

```bash
$ tox
```

