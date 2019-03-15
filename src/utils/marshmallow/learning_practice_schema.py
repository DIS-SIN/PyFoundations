from .baseschema import ma
from src.models.learning_practice import LearningPractice, LearningPracticeLearningPoints,LearningPracticeTags
from marshmallow import fields, post_dump

class LearningPracticeSchema(ma.ModelSchema):
    learningPracticeTags = fields.Nested('LearingPracticeTags', 
        many= True, 
        exclude = ('learningPractice', 'learningPracticeId'),
        dump_only = True)
    tags = fields.Nested('TagSchema',
        many = True,
        exclude = ('episodeTags', 'episodes',
        'learningPointTags', 'learningPoints',
        'learningPracticeTags', 'learningPractices',
        'learningStreamTags', 'learningStreams'))
    learningStreamLearningPractices = fields.Nested('LearningStreamLearningPracticesSchema',
        many = True,
        exclude = ('learningPoint', 'learningPointId'),
        dump_only = True)
    learningStreams = fields.Nested('LearningStreamSchema',
        many = True,
        exclude= ('learningStreamTags', 'tags',
            'learningStreamLearningPractices', 'learningPractices'))
    class Meta:
        model = LearningPractice
    href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.learning_practices', id = '<id>'),
                ma.URLFor('apiV1_0.learning_practices', slug = '<slug>')
            ],
            'collection': ma.URLFor('apiV1_0.learning_practices')
        }
    )
    @post_dump
    def clean_up(self, data):
        if data.get('learningPracticeTags') is not None:
            data['tags'] = data['learningPracticeTags']
            del data['learingPracticeTags']
        if data.get('learningStreamLearningPractices') is not None:
            data['learningStreams'] = data['learningStreamLearningPractices']
            del data['learningStreamLearningPractices']
        return data
class LearningPracticeTagsSchema(ma.ModelSchema):
    learningPoint = fields.Nested('LearningPointSchema',
        exclude = ('learningPointTags', 'tags',
            'episodeLearningPoints', 'episodes',
            'learningPracticeLearningPoints', 'learningPractices'))
    tag = fields.Nested('TagSchema',
        exclude= ('episodeTags', 'episodes',
            'learningPointTags', 'learningPoints',
            'learningPracticeTags', 'learningPractices',
            'learningStreamTags', 'learningStreams'))
    class Meta:
        model = LearningPracticeTags
class LearningPracticeLearningPointsSchema(ma.ModelSchema):
    learningPoint = fields.Nested('LearningPointSchema',
        exclude = ('learningPracticeLearningPoints', 'learningPractices')),
    learningPractice = fields.Nested('LearningPracticeSchema',
        exclude = ('learningStreamLearningPractices', 'learningStreams'))
    class Meta:
        model = LearningPracticeLearningPoints