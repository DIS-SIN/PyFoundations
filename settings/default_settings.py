"""
contains variables used to modify the DOL flask app for dev environments

NOTES
-----
This file has the default configurations for a development environment.
Production environments should make sure to use production_settings.py
for more configuration options see http://flask.pocoo.org/docs/1.0/config/
"""
import os
###############################FLASK SETTINGS#############################################
# Used to switch the app environment between production and development
ENV = "development"

# Used to set debugging
##THIS SHOULD ONLY BE TURNED ON IN DEVELOPMENT ENVIRONMENTS##
DEBUG = True

# Used to specify if error should be propegated rather than handeled by Flask's handlers
TESTING = False

# used to specify time application should use cached static resources such as JS in seconds
SEND_FILE_MAX_AGE_DEFAULT = 0

# Variable used to encrypt and securly sign cookies
##THIS SHOUD BE SET AS AN ENVIRONMENT VARIABLE IN PRODUCTION##
SECRET_KEY = "dev"

#Variable used to encrypt tokens used in URLs for things like email verification
##This should be set as an environment variable in production
SECURITY_PASSWORD_SALT = "mylovelysecret"
# Used to enable rendering JSON as utf8
JSON_AS_ASCII = False

##############################FLASK SQLAlchemy SETTINGS###################################
# Postgres Database URI used by the SQLAlchemy ORM
##THIS SHOULD BE SET AS AN ENVIRONMENT VARIABLE IN PRODUCTION##
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://postgres:password@localhost:5432/dol"

# Flask-SQLAlchemy's event notification system see https://stackoverflow.com/questions/33738467/how-do-i-know-if-i-can-disable-sqlalchemy-track-modifications
SQLALCHEMY_TRACK_MODIFICATIONS = False

#############################DOL SETTIINGS################################################
# specialised configs specific to the DOL app

#used to specify if the learning architecture should be loaded into the database when initialised
INITIALISE_LEARNING_ARCHITECTURE = True

#the absolute path of the learning architecture data file name 
LEARNING_ARCHITECTURE_DATA_FILE_NAME = "learning_architecture.json"



