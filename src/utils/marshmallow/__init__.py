def init_marshmallow(app):
    from .baseschema import ma
    ma.init_app(app)
    from .blog_schema import BlogSchema, BlogKeywordsSchema
    from .podcast_schema import PodcastSchema
    from .video_schema import VideoSchema
    from .episode_schema import EpisodeSchema, EpisodeTagsSchema, EpisodeLearningPointsSchema 
    from .keyword_schema import KeywordSchema
    from .learning_point_schema import LearningPointSchema, LearningPointTagsSchema
    from .learning_practice_schema import LearningPracticeSchema, LearningPracticeTagsSchema, LearningPracticeLearningPointsSchema
    from .learning_stream_schema import  LearningStreamSchema, LearningStreamTagsSchema, LearningStreamLearningPracticesSchema
    from .tag_schema import TagSchema