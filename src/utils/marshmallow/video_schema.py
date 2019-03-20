from .baseschema import ma
from src.models.video import Video
from marshmallow import fields, pre_load
from src.database.utils.crud import read_rows
from nltk.tokenize import TweetTokenizer
from flask import g
import string
import re
from src.database.db import get_db_session
class VideoSchema(ma.ModelSchema):
    episode = fields.Nested('EpisodeSchema', exclude = ('video',))
    class Meta:
        model = Video
        init_session, _ = get_db_session()
        sqla_session = init_session
    """href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.videos', id = "<id>")
            ],
            'collection': ma.URLFor("apiV1_0.videos")
        }
    )"""
    @pre_load
    def check_data(self, data):
        if data.get('id') is None:
            print("this works 1")
            if data.get('title') is None:
                raise ValueError('Must Include title')
            print("this works 2")
            punct = set(string.punctuation)
            #if both the id and the slug is none then this is a completely new blog
            #generate the slug from the title by tokenizing the lowered title and filtering for only alphanumeric characters
            #then use the join method on the filtered slug tokens to form a slug_like_this from ['slug','like','this']
            slug_array = TweetTokenizer().tokenize(data['title'].lower())
            if len(slug_array) == 1:
                data['slug'] = slug_array[0]
            else:
                slug_array = list(filter(lambda x: not re.match("(\\d|\\W)+", x) and not x in punct, slug_array))
                data['slug'] = '_'.join(slug_array)
            query = read_rows(Video, filters= [
                {
                    'slug': {
                        'comparitor': '==',
                        'data': data['slug']
                    }
                }
            ]).one_or_none()
            print("this works three")
            print("hello")
            print("ho")
            count = 1
            #loop over until you find a unique slug by appending an incrementing count to the end of the slug
            while query is not None:
                slug = data['slug'] + '_' + str(count)
                query = read_rows(Video, filters= [
                    {
                        'slug': {
                            'comparitor': '==',
                            'data': slug
                        }
                    }
                ]).one_or_none()
                data['slug'] = slug
                count += 1
            print("done")
        else:
            for key in list(data.keys()):
                if key != 'id':
                    del data[key]