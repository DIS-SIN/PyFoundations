from .baseschema import ma
from src.models.keyword import Keyword
from marshmallow import fields, post_dump
from src.database.db import get_db_session
class KeywordSchema(ma.ModelSchema):
    blogKeywords = fields.Nested('BlogKeywordsSchema', many = True, exclude = ('keyword', 'keywordId'), dump_only = True)
    blogs = fields.Nested('BlogSchema', many = True, exclude = ('blogKeywords', 'keywords'))
    class Meta:
        model = Keyword
        init_session, _ = get_db_session()
        sqla_session = init_session
    @post_dump
    def clean_up(self, data):
        if data.get('blogKeywords') is not None:
            data['blogs'] = data['blogKeywords']
            del data['blogKeywords']
        return data
    href = ma.Hyperlinks(
        {
            "self": [
                ma.URLFor("apiV1_0.keywords_id", id="<id>"),
                ma.URLFor("apiV1_0.keywords_keyword", keyword = "<keyword>")
            ],
            "collection" : ma.URLFor("apiV1_0.keywords")
        }
    )