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
    from .resources.blog_api import BlogResource
    api.add_resource(BlogResource, '/blogs', endpoint = "blogs")
    api.add_resource(BlogResource, '/blogs/<id>', endpoint = "blogs_id")
    api.add_resource(BlogResource, "/blogs/<slug>", endpoint = "blogs_slug")
    from .resources.keyword_api import KeywordResource
    api.add_resource(KeywordResource, '/keywords', endpoint = "keywords" )
    api.add_resource(KeywordResource, '/keywords/<id>', endpoint = "keywords_id")
    api.add_resource(KeywordResource, '/keywords/keyword/<keyword>', endpoint = "keywords_keyword")
    from .resources.tag_api import TagResource
    api.add_resource(TagResource, '/tags', endpoint = "tags")
    api.add_resource(TagResource, '/tags/<id>', endpoint = "tags_id")
    api.add_resource(TagResource, '/tags/tag/<tag>', endpoint = "tags_tag")
    from .resources.episode_api import EpisodeResource
    api.add_resource(EpisodeResource, '/episodes', endpoint = "episodes")
    api.add_resource(EpisodeResource, '/episodes/<id>', endpoint = "episodes_id")
    api.add_resource(EpisodeResource, '/episodes/episode/<slug>', endpoint = "episodes_slug")
    app.register_blueprint(api_bp)
   

