"""
contains variables used to modify the DOL flask app for prod environments

NOTES
-----
This file has the default configurations for a production environment.
Development environments should make sure to use default_settings.py
for more configuration options see http://flask.pocoo.org/docs/1.0/config/
"""
###############################FLASK SETTINGS#############################################
#Used to switch the app environment between production and development
ENV="production"

#Used to set debugging
##THIS SHOULD ONLY BE TURNED ON IN DEVELOPMENT ENVIRONMENTS##
DEBUG=False

#Used to specify if error should be propegated rather than handeled by Flask's handlers
TESTING=False

#used to specify time application should use cached static resources such as JS in seconds
SEND_FILE_MAX_AGE_DEFAULT = 3600

#Used to enable rendering JSON as utf8
JSON_AS_ASCII=False

##############################FLASK SQLAlchemy SETTINGS###################################

#Flask-SQLAlchemy's event notification system see https://stackoverflow.com/questions/33738467/how-do-i-know-if-i-can-disable-sqlalchemy-track-modifications
SQLALCHEMY_TRACK_MODIFICATIONS=False
