from .baseschema import ma
from src.models.tag import Tag
from marshmallow import fields, post_dump, pre_load
from src.database.utils.crud import read_rows
from flask import g
from src.database.db import get_db_session
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
        init_session, _ = get_db_session()
        sqla_session = init_session
    href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.tags_id', id = '<id>'),
                ma.URLFor('apiV1_0.tags_tag', tag = '<tagtext>')
            ],
            'collection': ma.URLFor('apiV1_0.tags')
        }
    )
    @pre_load
    def check_data(self, data):
        print("tag works")
        if data.get('tagtext') is None:
            if data.get('id') is None:
                raise ValueError('must provide tagtext or id')
            for key in data:
                if key != 'id':
                    del data[key]
        else:
            res = read_rows(Tag, filters= [
                {
                'tagtext': {
                    'comparitor': '==',
                    'data': data['tagtext']}
                }
            ]
            ).one_or_none()
            if res is not None:
                data['id'] = res.id
                for key in list(data.keys()):
                    if key != 'id':
                        del data[key]
        print("tag done")
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
    

        



