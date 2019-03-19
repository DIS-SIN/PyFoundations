from .baseschema import ma
from src.models.podcast import Podcast
from marshmallow import fields, pre_load
from src.database.utils.crud import read_rows
from nltk.tokenize import TweetTokenizer
import string
import re
class PodcastSchema(ma.ModelSchema):
    episode = fields.Nested('EpisodeSchema', many = True, exclude =("podcast",))
    class Meta:
        model = Podcast
    """href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.podcasts', id = "<id>")
            ],
            'collection': ma.URLFor("apiV1_0.podcasts")
        }
    )"""
    @pre_load
    def check_data(self, data):
        if data.get('id') is None:
            if data.get('title') is None:
                raise ValueError('Must Include title')
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
                query = read_rows(Podcast, filters= [
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
                    query = read_rows(Podcast, filters= [
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