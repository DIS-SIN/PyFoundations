def register_routes(api, latest=False):
    from .user_bp import UserResource
    from .skill_bp import SkillResource
    from .episode_bp import EpisodeResource
    from .experience_bp import ExperienceResource
    from .learning_point_bp import LearningPointResource
    from .knowledge_point_bp import KnowledgePointResource
    from .learning_stream_bp import LearningStreamResource
    from .learning_target_bp import LearningTargetResource
    from .learning_practice_bp import LearningPracticeResource
    from .learning_resource_bp import LearningResourceResource

    if latest:
        api.add_resource(UserResource, "/api/user/", "/api/user/<int:id>")
        api.add_resource(SkillResource, "/api/skill/", "/api/skill/<int:id>")
        api.add_resource(EpisodeResource, "/api/episode/", "/api/episode/<int:id>")
        api.add_resource(
            ExperienceResource, "/api/experience/", "/api/experience/<int:id>"
        )
        api.add_resource(
            LearningPointResource,
            "/api/learning_point/",
            "/api/learning_point/<int:id>",
        )
        api.add_resource(
            KnowledgePointResource,
            "/api/knowledge_point/",
            "/api/knowledge_point/<int:id>",
        )
        api.add_resource(
            LearningStreamResource,
            "/api/learning_stream/",
            "/api/learning_stream/<int:id>",
        )
        api.add_resource(
            LearningTargetResource,
            "/api/learning_target/",
            "/api/learning_target/<int:id>",
        )
        api.add_resource(
            LearningPracticeResource,
            "/api/learning_practice/",
            "/api/learning_practice/<int:id>",
        )
        api.add_resource(
            LearningResourceResource,
            "/api/learning_resource/",
            "/api/learning_resource/<int:id>",
        )

