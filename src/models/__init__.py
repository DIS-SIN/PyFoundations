def load_metadata(app):
    from .basemodel import Base
    Base.init_app(app)
    from src.database.db import get_db_session
    from .episode import Episode, EpisodeLearningPoint, EpisodeTag
    from .blog import Blog, BlogKeyword
    from .podcast import Podcast
    from .video import Video
    from .keyword import Keyword
    from .learning_point import LearningPoint, LearningPointTags
    from .learning_practice import LearningPractice, LearningPracticeLearningPoints, LearningPracticeTags
    from .learning_stream import LearningStream, LearningStreamLearningPractices, LearningStreamTags
    from .tag import Tag
