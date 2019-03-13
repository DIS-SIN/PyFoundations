from .baseschema import ma
from marshmallow import fields, post_dump
from src.models.learning_point import LearningPoint, LearningPointTags
#TODO:
# finish LearningPoints Tags schema
# overide the learningStreamLearningPoints and learningStreams fields
# ensure that refrences to tags do not include fields that point to other models
class LearningPointSchema(ma.ModelSchema):
    episodes = fields.Nested('EpisodeSchema', many = True, exclude=('learningPoints', 'episodeLearningPoints'))
    episodeLearningPoints = fields.Nested('EpisodeLearningPointsSchema', many = True, exclude = ('learningPoint','learningPointId'), dump_only = True)
    tags = fields.Nested('TagSchema', many = True, exclude = ('learningPoints', 'learningPointTags', 'episodes', 'episodeTags'))
    learningPointTags = fields.Nested('LearningPointTagsSchema', many = True, exclude = ('learningPoint', 'learningPointId'), dump_only = True)
    class Meta:
        model = LearningPoint
    @post_dump
    def cleanup(self, data):
        if data.get('episodeLearnigPoints') is not None:
            data['episodes'] = data['episodeLearningPoints']
            del data['episodeLearningPoints']
        if data.get('learningPointTags') is not None:
            data['learningPoints'] = data['episodeLearningPoints']
            del data['episodeLearningPoints']
        return data
class LearningPointTagsSchema(ma.ModelSchema):
    tag = fields.Nested('TagSchema', exclude= ('learningPointTags', 'episodeLearningTags', 'episodes', 'learningPoints'))
    learningPoint = fields.Nested(LearningPointSchema, exclude = ('learningPointTags', 'tags'))
    class Meta:
        model = LearningPointTags