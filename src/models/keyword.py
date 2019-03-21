from .basemodel import Base
from sqlalchemy import Column, Text, BigInteger, ForeignKey, DateTime, text
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy

class Keyword(Base.Model):
    __tablename__ = "keywords"
    id = Column(BigInteger, primary_key = True)
    keyword = Column(Text, unique = True)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    blogs = association_proxy("blogKeywords", "blog")
    def __init__(self,keyword = None, *args,**kwargs):
        super(Keyword, self).__init__(*args,**kwargs)
        self.keyword = keyword
