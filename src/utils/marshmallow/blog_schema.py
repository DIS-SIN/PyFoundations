from .baseschema import ma
from src.models.blog import Blog, BlogKeyword
from marshmallow import fields, post_load, pre_load,post_dump
from src.database.utils.crud import read_rows
from nltk.tokenize import TweetTokenizer
import string
import re
class BlogSchema(ma.ModelSchema):
    #overriding the episode field to include the nested schema rather than the primary keys
    episode = fields.Nested('EpisodeSchema', many = True, exclude=("blog", ))
    blogKeywords = fields.Nested('BlogKeywordsSchema', many = True, exclude= ('blog', "blogId"), dump_only = True)
    #this is automated so prevent it from being used to manually add keywords
    keywords = fields.Nested('KeywordSchema', many = True, exclude= ('blogs', 'blogKeywords'), dump_only = True)
    class Meta:
        model = Blog
    """href = ma.Hyperlinks(
        {
            'self': [
                ma.URLFor('apiV1_0.blogs', id = "<id>")
            ],
            'collection': ma.URLFor("apiV1_0.blogs")
        }
    )"""
    @pre_load
    def check_data(self, data):
        if data.get('id') is None:
            if data.get('body') is None:
                raise ValueError('Must include body')
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
            query = read_rows(Blog, filters= [
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
                query = read_rows(Blog, filters= [
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
    def cleanup_data(self, data):
        if data.get('blogKeywords') is not None:
            data['keywords'] = data['blogKeywords']
            del data['blogKeywords']
        return data 
class BlogKeywordsSchema(ma.ModelSchema):
    blog = fields.Nested('EpisodeSchema', exclude = ("blogKeywords", "keywords"))
    keyword = fields.Nested('KeywordSchema', exclude = ("blogKeywords", "blogs"))
    class Meta:
        model = BlogKeyword 






