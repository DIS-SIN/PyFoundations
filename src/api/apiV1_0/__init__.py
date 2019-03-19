from flask import Blueprint,url_for
from flask_restful import Api
def register_routes(app, latest=False):
    api_bp = Blueprint('apiV1_0', __name__)
    if latest:
        api = Api(api_bp, prefix= '/api' )
    else:
        api = Api(api_bp, prefix='/api/V1.0')
    from .resources.learning_point_api import LearningPointResource
    api.add_resource(LearningPointResource, '/learningPoints', endpoint = "learning_points")
    api.add_resource(LearningPointResource, '/learningPoints/<id>', endpoint = "learning_points_id")
    api.add_resource(LearningPointResource, '/learningPoints/slug/<slug>', endpoint = "learning_points_slug")
    from .resources.learning_practice_api import LearningPracticeResource
    api.add_resource(LearningPracticeResource, '/learningPractices', endpoint = "learning_practices")
    api.add_resource(LearningPracticeResource, '/learningPractices/<id>', endpoint = "learning_practices_id")
    api.add_resource(LearningPracticeResource, '/learningPractices/slug/<slug>', endpoint = "learning_practices_slug")
    from .resources.learning_stream_api import LearningStreamResource
    api.add_resource(LearningStreamResource, '/learningStreams', endpoint = "learning_streams")
    api.add_resource(LearningStreamResource, '/learningStreams/<id>', endpoint = "learning_streams_id")
    api.add_resource(LearningStreamResource, '/learningStreams/slug/<slug>', endpoint = "learning_streams_slug")
    from .resources.bog
    app.register_blueprint(api_bp)
   

