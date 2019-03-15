from .basechema import ma
from src.models.keyword import Keyword
from marshmallow import fields, post_dump

class KeywordSchema(ma.ModelSchema):
    blogsKeyword = fields.Nested('BlogSchema', many = True, exclude = ('keyword', 'keywordId'), dump_only = True)
    blogs = fields.Nested('BlogSchema', many = True, exclude = ('blogKeywords', 'keywords'))
    class Meta:
        model = Keyword
    href = ma.Hyperlinks(
        {
            "self": [
                ma.URLFor("apiV1_0.keywords", id="<id>"),
                ma.URLFor("apiV1_0.keywords", keyword = "<keyword>")
            ],
            "collection" : ma.URLFor("apiV1_0.keywords")
        }
    )