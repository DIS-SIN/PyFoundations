from flask import Flask, redirect, url_for, jsonify
from code import pyfoundations
from models import models
from code.blueprint.api import (
    learning_point_bp,
    learning_resource_bp,
    user_bp,
    experience_bp,
    episode_bp,
    stream_bp,
)


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI="postgresql+psycopg2://postgres:password@localhost:5432/dol",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    app.register_blueprint(pyfoundations.bp)
    app.register_blueprint(learning_point_bp.bp)
    app.register_blueprint(learning_resource_bp.bp)
    app.register_blueprint(user_bp.bp)
    app.register_blueprint(episode_bp.bp)
    app.register_blueprint(experience_bp.bp)
    app.register_blueprint(stream_bp.bp)

    @app.route("/")
    def index():
        ret_val = {"experience": {"id": 1, "name": "Hey"}}
        return jsonify(ret_val)

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


app = create_app()
app.run(host="0.0.0.0", port=5054)
