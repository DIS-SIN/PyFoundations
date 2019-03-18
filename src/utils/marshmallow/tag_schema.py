from .baseschema import ma
from src.models.tag import Tag
from marshmallow import fields, post_dump, post_load
from src.database.utils.crud import read_rows
class TagSchema(ma.ModelSchema):
    episodeTags = fields.Nested('EpisodeTagsSchema', 
        many = True, 
        exclude=('tag', 'tagId'), 
        dump_only = True)
    episodes = fields.Nested('EpisodeSchema',
        many = True, 
        exclude = ('episodeTags', 'tags', 
            'episodeLearningPoints', 'learningPoints'))
    learningPointTags = fields.Nested('LearningPointTagsSchema', 
        many = True, 
        exclude = ('tag', 'tagId'),
        dump_only = True)
    learningPoints = fields.Nested('LearningPointSchema',
        many = True,
        exclude= ('episodeLearningPoint', 'episodes',
            'learningPointTags', 'tags',
            'learningPracticeLearningPoints', 'learningPractices'))
    learningPracticeTags = fields.Nested('LearningPracticeTagsSchema',
        many = True,
        exclude = (
            'tags', 'tagId'
        ),
        dump_only = True)
    learningPractice = fields.Nested('LearningPracticeSchema',
        many = True,
        exclude = (
            'tags', 'learningPracticeTags',
            'learningPoints', 'learningPracticeLearningPoints',
            'learningSchema', 'learningSchemaLearningPractices'
        ))
    class Meta:
        model = Tag
    """href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiv1_0.tags', id = '<id>'),
                ma.URLFor('apiv1_0.tags', tagtext = '<tag>')
            ],
            'collection': ma.URLFor('apiV1_0.tags')
        }
    )"""
    @post_dump
    def clean_up(self, data):
        if data.get('episodeTags') is not None:
            data['episodes'] = data['episodeTags']
            del data['episodeTags']
        if data.get('learningPointTags') is not None:
            data['learningPoints'] = data['learningPointTags']
            del data['learningPointTags']
        if data.get('learningPracticeTags') is not None:
            data['learningPractices'] = data['learningPracticeTags']
            del data['learningPracticeTags']
        if data.get('learningStreamTags') is not None:
            data['learningStreams'] = data['learningStreamTags']
        return data
    @post_load
    def check_if_exists(self, data):
        res = read_rows(Tag, [
            {
                'tagtext':{
                    'comparitor': '==',
                    'data': data['tagtext']
                }
            }
        ]).one_or_none()
        if res is not None:
            return res
        return data

        



