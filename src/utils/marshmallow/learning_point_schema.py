from .baseschema import ma
from marshmallow import fields, post_dump
from src.models.learning_point import LearningPoint, LearningPointTags
#TODO:
# finish LearningPoints Tags schema
# overide the learningStreamLearningPoints and learningStreams fields
# ensure that overridden fields do not have refrences to circular models
# ensure that refrences to tags do not include fields that point to other models
class LearningPointSchema(ma.ModelSchema):
    episodes = fields.Nested('EpisodeSchema',
     many = True, 
     exclude=('learningPoints', 'episodeLearningPoints', 'episodeTags', 'tags'))
    episodeLearningPoints = fields.Nested('EpisodeLearningPointsSchema', 
     many = True, 
     exclude = ('learningPoint','learningPointId'), dump_only = True)
    tags = fields.Nested('TagSchema', 
     many = True, 
     exclude = ('learningPoints', 'learningPointTags', 
     'episodes', 'episodeTags', 
     'learningPracticesTags', 'learningPractices',
     'learningStreamTags', 'learningStreams'))
    learningPointTags = fields.Nested('LearningPointTagsSchema', 
     many = True, 
     exclude = ('learningPoint', 'learningPointId'), 
     dump_only = True)
    learningPracticeLearningPoints = fields.Nested('LearningPracticeLearningPointsSchema', 
     many = True, 
     exclude = ('learningPoint', 'learningPointID'),
     dump_only = True)
    learningPractices = fields.Nested('LearningPracticeSchema', 
     many = True, 
     exclude= ('learningPoints', 'learningPracticesLearningPoints'))
    class Meta:
        model = LearningPoint
    """href = ma.Hyperlinks({
        "self":[
            ma.URLFor('apiV1_0.learning_points', id = '<id>'),
            ma.URLFor('apiV1_0.learning_points', slug = '<slug>')
        ],
        "collection": ma.URLFor('apiV1_0.learning_points')
    })"""
    @post_dump
    def cleanup(self, data):
        if data.get('episodeLearnigPoints') is not None:
            data['episodes'] = data['episodeLearningPoints']
            del data['episodeLearningPoints']
        if data.get('learningPointTags') is not None:
            data['tags'] = data['learningPointTags']
            del data['learningPointTags']
        if data.get('learningPracticeLearningPoints') is not None:
            data['learningPractices'] = data['learningPracticeLearningPoints']
            del data['learningPracticeLearningPoints']
        return data
    
class LearningPointTagsSchema(ma.ModelSchema):
    tag = fields.Nested('TagSchema',  
     exclude = ('learningPoints', 'learningPointTags', 
     'episodes', 'episodeTags', 
     'learningPracticesTags', 'learningPractices',
     'learningStreamTags', 'learningStreams'))
    learningPoint = fields.Nested(LearningPointSchema,
     exclude = ('learningPointTags', 'tags', 
     'episodes', 'episodeLearningPoints', 
     'learningPracticeLearningPoint', 'learningPractice'))
    class Meta:
        model = LearningPointTags