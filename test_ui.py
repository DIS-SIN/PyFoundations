from flask import Flask, redirect, url_for, jsonify
from models import models
from code.blueprint.api import (
    learning_point_bp,
    learning_resource_bp,
    user_bp,
    experience_bp,
    episode_bp,
    stream_bp,
)
import os
#from code import testui_dol
from code import dol

app_set_debug_mode = 0  # 0=none,1=entry,2=entry/exit,3=all


def create_app():
    app = Flask(__name__)
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI="postgresql+psycopg2://postgres:password@localhost:5432/dol",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    app.register_blueprint(dol.bp)
    app.register_blueprint(learning_point_bp.bp)
    app.register_blueprint(learning_resource_bp.bp)
    app.register_blueprint(user_bp.bp)
    app.register_blueprint(episode_bp.bp)
    app.register_blueprint(experience_bp.bp)
    app.register_blueprint(stream_bp.bp)

    @app.route('/')
    def index():
        return redirect(url_for('dol.render_home'))

    models.db.init_app(app)
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5054)
