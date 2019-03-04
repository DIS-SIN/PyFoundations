"""
application.py is used to set up application and run when called from command line

Contents
---------
create_app
    type: Function
    summary: Application factory
app
   type: Flask
   summary: Configured  DOL application 
"""


def create_app(mode="development", initdb=False, static_path=None, template_path=None):
    import os
    import click

    # import flask objects needed to set up application
    from flask import Flask, redirect, url_for, jsonify

    # flask-restful is an extension built on flask used to set up REST API's with embedded best practices
    from flask_restful import Api

    # used to provide warnings for the user
    import warnings
    import settings
    import src.views.dol as dol
    from .database import db
    from .apis.apiV1_0 import register_routes

    ##########TODO##########
    # Modify app factory to allow configuration from file  STATUS:completed
    # Incoporporate unit testing and testing configurations STATUS:incomplete

    """
    application factory for Digital Open Learning (DOL) flask app

    Returns
    -------
    Flask
        Flask class instance configured with DOL application and API routes
    """
    app = Flask(__name__)
    # add configs for sqlalchemy
    if mode == "production":
        app.config.from_object("settings.production_settings")
        # production environments must have secret key and SQLAlchemy database uri
        SECRET_KEY = os.environ.get("DOL_SECRET_KEY")
        if SECRET_KEY is None:
            raise ValueError(
                "SECRET_KEY must be set as an environment variable \
                DOL_SECRET_KEY"
            )
        else:
            app.config["SECRET_KEY"] = SECRET_KEY
        SQLALCHEMY_DATABASE_URI = os.environ.get("DOL_SQLALCHEMY_DATABASE_URI")
        if SQLALCHEMY_DATABASE_URI is None:
            raise ValueError(
                "DOL_SQLALCHEMY_DATABASE_URI must be set \
                for production environments"
            )
        else:
            app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    else:
        if mode != "development":
            # warn user that mode is not recongnized
            warnings.warn(
                "WARNING mode not recognized falling back on devlopment settings"
            )
        app.config.from_object("settings.default_settings")
        # get DOL sqlalchemy database uri if it exists and set it in the app config object
        SQLALCHEMY_DATABASE_URI = os.environ.get("DOL_SQLALCHEMY_DATABASE_URI")
        if SQLALCHEMY_DATABASE_URI is not None:
            app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    if not static_path is None:
        app.static_folder = static_path
    if not template_path is None:
        app.template_folder = template_path
    # registering dol blueprint
    app.register_blueprint(dol.bp)
    # creating flask-restful Api class instance
    api = Api(app)
    # registering api routes
    register_routes(api, True)

    @app.route("/")
    def index():
        return redirect(url_for("dol.render_home"))

    @app.route("/about")
    def about():
        ret_val = {
            "details": {
                "title": "This is the about page",
                "description": "my about page description",
            }
        }
        return jsonify(ret_val)

    db.init_app(app)

    if initdb:
        db.init_db(app)
    return app


# creating click command to quickly configure application at runtime
