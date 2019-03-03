
def register_routes(api, latest = False):
    from .user_bp import UserResource
    from .stream_bp import StreamResource
    from .episode_bp import EpisodeResource
    from .practice_bp import PracticeResource
    from .experience_bp import ExperienceResource
    from .learning_point_bp import LearningPointResource
    from .learning_resource_bp import LearningResourceResource
    if latest:
        api.add_resource(UserResource, "/api/users", "/api/users/<int:id>")
        api.add_resource(StreamResource, "/api/streams", "/api/streams/<int:id>")
        api.add_resource(EpisodeResource, "/api/episodes", "/api/episodes/<int:id>")
        api.add_resource(PracticeResource, "/api/practices", "/api/practices/<int:id>")
        api.add_resource(ExperienceResource, "/api/experiences", "/api/experiences/<int:id>")
        api.add_resource(
            LearningPointResource, "/api/learning_points", "/api/learning_points/<int:id>"
        )
        api.add_resource(
            LearningResourceResource,
            "/api/learning_resources",
            "/api/learning_resources/<int:id>",
        )
    api.add_resource(UserResource, "/api/V1.0/users", "/api/V1.0/users/<int:id>")
    api.add_resource(StreamResource, "/api/V1.0/streams", "/api/V1.0/streams/<int:id>")
    api.add_resource(EpisodeResource, "/api/V1.0/episodes", "/api/V1.0/episodes/<int:id>")
    api.add_resource(PracticeResource, "/api/V1.0/practices", "/api/V1.0/practices/<int:id>")
    api.add_resource(ExperienceResource, "/api/V1.0/experiences", "/api/V1.0/experiences/<int:id>")
    api.add_resource(
        LearningPointResource, "/api/V1.0/learning_points", "/api/V1.0/learning_points/<int:id>"
    )
    api.add_resource(
        LearningResourceResource,
        "/api/V1.0/learning_resources",
        "/api/V1.0/learning_resources/<int:id>",
    )

