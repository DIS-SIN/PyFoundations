from .baseschema import ma
from src.models.learning_practice import LearningPractice, LearningPracticeLearningPoints,LearningPracticeTags
from src.database.utils.crud import read_rows
from marshmallow import fields, post_dump, pre_load
from nltk.tokenize import TweetTokenizer
from src.database.db import get_db_session
import re
import string 
class LearningPracticeSchema(ma.ModelSchema):
    learningPracticeTags = fields.Nested('LearningPracticeTagsSchema', 
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
        exclude = ('learningPractice', 'learningPracticeId'),
        dump_only = True)
    learningStreams = fields.Nested('LearningStreamSchema',
        many = True,
        exclude= ('learningStreamTags', 'tags',
            'learningStreamLearningPractices', 'learningPractices'))
    learningPracticeLearningPoints = fields.Nested('LearningPracticeLearningPointsSchema',
        many = True,
        exclude = ('learningPractice', 'learningPracticeId'),
        dump_only = True)
    learningPoints = learningPoint = fields.Nested('LearningPointSchema',
        many = True,
        exclude = ('learningPointTags', 'tags',
            'episodeLearningPoints', 'episodes',
            'learningPracticeLearningPoints', 'learningPractices'))
    class Meta:
        model = LearningPractice
        init_session, _ = get_db_session()
        sqla_session = init_session
    href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.learning_practices_id', id = '<id>'),
                ma.URLFor('apiV1_0.learning_practices_slug', slug = '<slug>')
            ],
            'collection': ma.URLFor('apiV1_0.learning_practices')
        }
    )
    @pre_load
    def check_data(self, data):
        if data.get('id') is None:
            if data.get('name') is None:
                raise ValueError('Must Include name')
            punct = set(string.punctuation)
            #if both the id and the slug is none then this is a completely new blog
            #generate the slug from the title by tokenizing the lowered title and filtering for only alphanumeric characters
            #then use the join method on the filtered slug tokens to form a slug_like_this from ['slug','like','this']
            slug_array = TweetTokenizer().tokenize(data['name'].lower())
            if len(slug_array) == 1:
                data['slug'] = slug_array[0]
            else:
                slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and not x in punct, slug_array))
                data['slug'] = '_'.join(slug_array)
            query = read_rows(LearningPractice, filters= [
                {
                    'slug': {
                        'comparitor': '==',
                        'data': data['slug']
                    }
                }
            ]).one_or_none()
            count = 1
            #loop over until you find a unique slug by appending an incrementing count to the end of the slug
            while query is not None:
                slug = data['slug'] + '_' + str(count)
                query = read_rows(LearningPractice, filters= [
                    {
                        'slug': {
                            'comparitor': '==',
                            'data': slug
                        }
                    }
                ]).one_or_none()
                data['slug'] = slug
                count += 1
        else:
            for key in list(data.keys()):
                if key != 'id':
                    del data[key]
    @post_dump
    def clean_up(self, data):
        if data.get('learningPracticeTags') is not None:
            data['tags'] = data['learningPracticeTags']
            del data['learningPracticeTags']
        if data.get('learningStreamLearningPractices') is not None:
            data['learningStreams'] = data['learningStreamLearningPractices']
            del data['learningStreamLearningPractices']
        if data.get('learningPracticeLearningPoints') is not None:
            data['learningPoints'] = data['learningPracticeLearningPoints']
            del data['learningPracticeLearningPoints']
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
        exclude = ('learningPointTags', 'tags',
            'episodeLearningPoints', 'episodes',
            'learningPracticeLearningPoints', 'learningPractices'))
    learningPractice = fields.Nested('LearningPracticeSchema',
        exclude = ('learningPracticeLearningPoints', 'learningPoints', 'learningPracticeTags', 'tags'))
    class Meta:
        model = LearningPracticeLearningPoints