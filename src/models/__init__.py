def load_metadata(app):
    from .basemodel import Base

    Base.init_app(app)
    from .map import make_maps

    make_maps()
    from .episode import Episode
    from .experience import Experience
    from .learning_point import LearningPoint
    from .learning_practice import LearningPractice
    from .learning_stream import LearningStream
    from .tag import Tag
    from .user import User
