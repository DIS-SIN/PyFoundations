from .baseschema import ma
from src.models.learning_stream import LearningStream, LearningStreamLearningPractices, LearningStreamTags
from marshmallow import fields, post_dump, pre_load
from src.database.utils.crud import read_rows
from nltk.tokenize import TweetTokenizer
import re
import string 
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
    href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.learning_streams_id', id = '<id>'),
                ma.URLFor('apiV1_0.learning_streams_slug', slug = '<slug>')
            ],
            'collection': ma.URLFor('apiV1_0.learning_streams')
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
            query = read_rows(LearningStream, filters= [
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
                query = read_rows(LearningStream, filters= [
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
            for key in data:
                if key != 'id':
                    del data[key]
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

