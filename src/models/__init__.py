def load_metadata(app):
    from .basemodel import Base

    Base.init_app(app)
    from .map import make_maps

    make_maps()
    from .comment import Comment
    from .episode import Episode
    from .experience import Experience
    from .knowledge_point import KnowledgePoint
    from .learning_point import LearningPoint
    from .learning_practice import LearningPractice
    from .learning_resource import LearningResource
    from .learning_stream import LearningStream
    from .learning_target import LearningTarget
    from .like import Like
    from .skill import Skill
    from .tag import Tag
    from .user import User
    from .user_profile import UserProfile

