from .baseschema import ma
from src.models.episode import Episode, EpisodeTag, EpisodeLearningPoint
from marshmallow import fields, post_dump, pre_load
from src.database.utils.crud import read_rows
from src.models.tag import Tag
#TODO
# finish EpisodeLearningPointSchema
# ensure that refrences to tags do not include fields that point to other models
# urlfor link 
class EpisodeSchema(ma.ModelSchema):
    #exclude the reverse relationships to prevent an infinite loop 
    podcast = fields.Nested('PodcastSchema', many = True, exclude=('episode','episodeId'))
    blog = fields.Nested('BlogSchema', many = True, exclude=('episode','episodeId'))
    video = fields.Nested('VideoSchema', many = True, exclude=('episode','episodeId'))
    #Nesting EpisodeTag association model, this will overide the tags field if it is not excluded
    episodeTags = fields.Nested('EpisodeTagsSchema', many = True, exclude = ('episode','episodeId'), dump_only = True)
    #exlude any other many to many relationships with tags to avoid serializing the entire database
    tags = fields.Nested('TagSchema', 
     many = True, 
     exclude = ('learningPoints', 'learningPointTags', 
      'episodes', 'episodeTags', 
      'learningPracticesTags', 'learningPractices',
      'learningStreamTags', 'learningStreams'))
    #same concept as tags many to many relationship
    episodeLearningPoints = fields.Nested('EpisodeLearningPointsSchema',
    )
    learningPoints = fields.Nested('LearningPointSchema',
     many = True, 
     exclude = ('learningPointTags', 'tags', 
      'episodes', 'episodeLearningPoints', 
      'learningPracticeLearningPoint', 'learningPractice'))
    class Meta:
        model = Episode
    """href = ma.Hyperlinks(
        {"self": [
            ma.URLFor("apiV1_0.episodes", id="<id>"),
            ma.URLFor("apiV1_0.episodes", slug="<slug>")
        ], "collection": ma.URLFor("apiV1_0.episodes")}
    )"""
    @post_dump
    def clean_up(self, data):
        #if episodeTag exists meaning it has not been excluded
        if data.get('episodeTags') is not None:
            data['tags'] = data['episodeTags']
            del data['episodeTags']
        if data.get('episodeLearningPoints') is not None:
            data['learningPoints'] = data['episodeLearningPoints']
            del data['episodeLearningPoints']
        return data
class EpisodeTagsSchema(ma.ModelSchema):
    episode = fields.Nested(EpisodeSchema, 
     exclude=('episodeTags','tags',
      'episodeLearningPoints', 'learningPoints'))
    tag = fields.Nested('TagSchema', 
     many = True, 
     exclude = ('learningPoints', 'learningPointTags', 
      'episodes', 'episodeTags', 
      'learningPracticesTags', 'learningPractices',
      'learningStreamTags', 'learningStreams'))
    class Meta:
        model = EpisodeTag

class EpisodeLearningPointsSchema(ma.ModelSchema):
    episodes = fields.Nested('EpisodeSchema',
     many = True, 
     exclude=('learningPoints', 'episodeLearningPoints', 'episodeTags', 'tags'))
    learningPoint = fields.Nested('LearningPointSchema',
     exclude = ('learningPointTags', 'tags', 
      'episodes', 'episodeLearningPoints', 
      'learningPracticeLearningPoint', 'learningPractice'))
    class Meta:
        model = EpisodeLearningPoint