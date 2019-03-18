from .baseschema import ma
from src.models.blog import Blog, BlogKeyword
from marshmallow import fields, post_load, pre_load,post_dump
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
        if data.get('body') is None:
            raise ValueError('Must include body key')
    @post_dump
    def cleanu_data(self, data):
        if data.get('blogKeywords') is not None:
            data['keywords'] = data['blogKeywords']
            del data['blogKeywords']
        return data
class BlogKeywordsSchema(ma.ModelSchema):
    blog = fields.Nested('EpisodeSchema', exclude = ("blogKeywords", "keywords"))
    keyword = fields.Nested('KeywordSchema', exclude = ("blogKeywords", "blogs"))
    class Meta:
        model = BlogKeyword 






