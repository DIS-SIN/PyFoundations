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
#operating system  python API's
import os
import click
#import flask objects needed to set up application
from flask import Flask, redirect, url_for, jsonify
#flask-restful is an extension built on flask used to set up REST API's with embedded best practices
from flask_restful import Api
#used to provide warnings for the user
import warnings
import settings
from src import dol
from models import models
from src.blueprint.api.user_bp import UserResource
from src.blueprint.api.stream_bp import StreamResource
from src.blueprint.api.episode_bp import EpisodeResource
from src.blueprint.api.practice_bp import PracticeResource
from src.blueprint.api.experience_bp import ExperienceResource
from src.blueprint.api.learning_point_bp import LearningPointResource
from src.blueprint.api.learning_resource_bp import LearningResourceResource
def create_app(mode = 'development'):
    ##########TODO##########
    # Modify app factory to allow configuration from file  STATUS:incomplete
    # Incoporporate unit testing and testing configurations STATUS:incomplete
 
    """
    application factory for Digital Open Learning (DOL) flask app

    Returns
    -------
    Flask
        Flask class instance configured with DOL application and API routes
    """
    app = Flask(__name__)
    #add configs for sqlalchemy
    if mode == 'production':
        app.config.from_object('settings.production_settings')
        #production environments must have secret key and SQLAlchemy database uri
        SECRET_KEY = os.environ.get("DOL_SECRET_KEY")
        if SECRET_KEY is None:
            raise ValueError("SECRET_KEY must be set as an environment variable \
                DOL_SECRET_KEY" )
        else:
            app.config['SECRET_KEY'] = SECRET_KEY
        SQLALCHEMY_DATABASE_URI = os.environ.get('DOL_SQLALCHEMY_DATABASE_URI')
        if SQLALCHEMY_DATABASE_URI is None:
            raise ValueError("DOL_SQLALCHEMY_DATABASE_URI must be set \
                for production environments")
        else:
            app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    else:
        if mode != 'development':
            #warn user that mode is not recongnized
            warnings.warn("WARNING mode not recognized falling back on devlopment settings")
        app.config.from_object('settings.default_settings')
        #get DOL sqlalchemy database uri if it exists and set it in the app config object
        SQLALCHEMY_DATABASE_URI = os.environ.get('DOL_SQLALCHEMY_DATABASE_URI')
        if SQLALCHEMY_DATABASE_URI is not None:
            app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    #registering dol blueprint
    app.register_blueprint(dol.bp)
    #creating flask-restful Api class instance
    api = Api(app)
    #registering api routes
    api.add_resource(UserResource, "/api/user/", "/api/user/<int:id>")
    api.add_resource(StreamResource, "/api/stream/", "/api/stream/<int:id>")
    api.add_resource(EpisodeResource, "/api/episode/", "/api/episode/<int:id>")
    api.add_resource(PracticeResource, "/api/practice/", "/api/practice/<int:id>")
    api.add_resource(ExperienceResource, "/api/experience/", "/api/experience/<int:id>")
    api.add_resource(
        LearningPointResource, "/api/learning_point/", "/api/learning_point?<int:id>"
    )
    api.add_resource(
        LearningResourceResource,
        "/api/learning_resource/",
        "/api/learning_resource/<int:id>",
    )

    @app.route('/')
    def index():
        return redirect(url_for('dol.render_home'))

    @app.route("/about")
    def about():
        ret_val = {
            "details": {
                "title": "This is the about page",
                "description": "my about page description",
            }
        }
        return jsonify(ret_val)

    models.db.init_app(app)
    return app
#creating click command to quickly configure application at runtime 
@click.command()
@click.option('--mode', default='development', help = 'Mode to run application \n \
    recognized modes : \n \
        development \n \
        production')
def run(mode):
    app = create_app(mode)
    app.run(host="0.0.0.0", port=5054)
if __name__ == "__main__":
    run()
