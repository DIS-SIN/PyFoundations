from flask import Flask, redirect, url_for, jsonify
from flask_restful import Api
from code import dol
from models import models


from code.blueprint.api.episode_bp import EpisodeResource, AllEpisodeResource
from code.blueprint.api.experience_bp import ExperienceResource, AllExperienceResource
from code.blueprint.api.learning_point_bp import (
    LearningPointResource,
    AllLearningPointResource,
)
from code.blueprint.api.learning_resource_bp import (
    LearningResourceResource,
    AllLearningResourceResource,
)
from code.blueprint.api.stream_bp import StreamResource, AllStreamResource
from code.blueprint.api.user_bp import UserResource, AllUserResource


def create_app():
    app = Flask(__name__)

    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI="postgresql+psycopg2://postgres:password@localhost:5432/dol",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    app.register_blueprint(dol.bp)

    api = Api(app)

    api.add_resource(EpisodeResource, "/api/episode/<int:id>")
    api.add_resource(AllEpisodeResource, "/api/episode/")

    api.add_resource(ExperienceResource, "/api/experience/<int:id>")
    api.add_resource(AllExperienceResource, "/api/experience/")

    api.add_resource(LearningPointResource, "/api/learning_point/<int:id>")
    api.add_resource(AllLearningPointResource, "/api/learning_point/")

    api.add_resource(LearningResourceResource,
                     "/api/learning_resource/<int:id>")
    api.add_resource(AllLearningResourceResource, "/api/learning_resource/")

    api.add_resource(StreamResource, "/api/stream/<int:id>")
    api.add_resource(AllStreamResource, "/api/stream/")

    api.add_resource(UserResource, "/api/user/<int:id>")
    api.add_resource(AllUserResource, "/api/user/")

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


app = create_app()
app.run(host="0.0.0.0", port=5054)
