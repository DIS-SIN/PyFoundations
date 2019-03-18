from .baseschema import ma
from src.models.learning_stream import LearningStream, LearningStreamLearningPractices, LearningStreamTags
from marshmallow import fields, post_dump

class LearningStreamSchema(ma.ModelSchema):
    learningStreamTags = fields.Nested('LearningStreamTagsSchema',
        many = True,
        exclude = ('learningStream', 'learningStreamId'),
        dump_only = True)
    tags = fields.Nested('TagSchema',
        many = True,
        exclude = ('episodeTags', 'episodes',
            'learningPointTags', 'learningPoints',
            'learningPracticeTags', 'learningPractices',
            'learningStreamTags', 'learningStreams'))
    learningStreamLearningPractices = fields.Nested( 'LearningStreamLearningPracticesSchema',
        many = True,
        exclude = ('learningStream', 'learningStreamId'),
        dump_only = True
    )
    learningPractices = fields.Nested('LearningStreamLearningPracticesSchema',
        many = True,
        exclude = ('learningStreamLearningPractices' , 'LearningStreams'))
    class Meta:
        model = LearningStream
    """href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.learning_streams', id = '<id>'),
                ma.URLFor('apiV1_0.learning_streams', slug = '<slug>')
            ],
            'collection': ma.URLFor('apiv1_0.learning_streams')
        }
    )"""
    @post_dump
    def clean_up(self,data):
        if data.get('learningStreamLearningPractices') is not None:
            data['learningPractices'] = data['learningStreamLearningPractices']
            del data['learningStreamLearningPractices']
        if data.get('learningStreamTags'):
            data['tags'] = data['learningStreamTags']
            del data['learningStreamTags']

class LearningStreamTagsSchema(ma.ModelSchema):
    learningStream = fields.Nested('LearningStreamSchema',
        exclude = ('learningStreamTags', 'tags',
            'learningStreamLearningPractices', 'learningPractices') )
    tag = fields.Nested('TagSchema',  
        exclude = ('learningPoints', 'learningPointTags', 
            'episodes', 'episodeTags', 
            'learningPracticesTags', 'learningPractices',
            'learningStreamTags', 'learningStreams'))
    class Meta:
        model = LearningStreamTags
class LearningStreamLearningPracticesSchema(ma.ModelSchema):
    learningPractice = fields.Nested('LearningPracticeSchema',
        exclude = ('learningStreams', 'learningStreamLearningPractices'))
    learningStream = fields.Nested('LearningStreamSchema',
        exclude= ('learningPractices', 'learningStreamLearningPractices')
    )
    class Meta:
        model = LearningStreamLearningPractices

