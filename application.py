from flask import Flask, redirect, url_for, jsonify
import os
from code import pyfoundations
from code.blueprint.api import (
    learning_points_bp,
    tags_bp,
    learning_resources_bp,
    users_bp,
)


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        DATABASE="postgresql+psycopg2://postgres:password@localhost:5432/foundationstest"
    )

    app.register_blueprint(pyfoundations.bp)
    app.register_blueprint(learning_points_bp.bp)
    app.register_blueprint(tags_bp.bp)
    app.register_blueprint(learning_resources_bp.bp)
    app.register_blueprint(users_bp.bp)

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

    return app


app = create_app()
app.run(host="0.0.0.0", port=5054)
