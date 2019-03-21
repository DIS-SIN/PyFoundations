from .baseschema import ma
from marshmallow import fields, post_dump, post_load, pre_load
from src.models.learning_point import LearningPoint, LearningPointTags
from src.database.utils.crud import read_rows
from nltk.tokenize import TweetTokenizer
from src.database.db import get_db_session
import re
import string 
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
        init_session, _ = get_db_session()
        sqla_session = init_session
    href = ma.Hyperlinks({
        "self":[
            ma.URLFor('apiV1_0.learning_points_id', id = '<id>'),
            ma.URLFor('apiV1_0.learning_points_slug', slug = '<slug>')
        ],
        "collection": ma.URLFor('apiV1_0.learning_points')
    })
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
            query = read_rows(LearningPoint, filters= [
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
                query = read_rows(LearningPoint, filters= [
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
            print("learning point working 1")
            for key in list(data.keys()):
                if key != 'id':
                    del data[key]
            print("learning point done")
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
    @post_load
    def load_learning_point(self, data):
        pass
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