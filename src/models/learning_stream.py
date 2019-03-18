from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag
from .learning_practice import LearningPractice
class LearningStream(Base.Model):
    __tablename__ = "learning_streams"

    id = Column(
        BigInteger,
        Sequence("learning_stream_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_stream_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    slug = Column(Text)
    image = Column(Text)
    tags = association_proxy("learningStreamTags", "tag")
    learningPractices = association_proxy("learningStreamLearningPractices", "learningPractice")

    def __init__(self, tags = None, learningPractices = None, *args, **kwargs):
        tags = tags or []
        learningPractices = learningPractices or []
        if bool(tags):
            for tag in tags:
                self.tags.append(tag)
        if bool(learningPractices):
            for learningPractice in learningPractices:
                self.learningPractices.append(learningPractice)

class LearningStreamTags(Base.Model):
    __tablename__ = "learning_stream_tags"

    learningStreamId = Column("learning_stream_id",BigInteger, ForeignKey("learning_streams.id"), primary_key = True)
    tagId = Column("tag_id",BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    learningStream = relationship("LearningStream", 
        backref= backref("learningStreamTags", 
            cascade= "all, delete-orphan"),
        single_parent= True)
    tag = relationship("Tag", 
        backref = backref("learningStreamTags", 
            cascade= "all, delete-orphan"),
        single_parent= True)
    def __init__(self, tag = None, learningStream = None, *args,**kwargs):
        super(LearningStreamTags, self).__init__(*args,**kwargs)
        if isinstance(tag, Tag):
            self.learningStream = learningStream
            self.tag = tag
        elif isinstance(tag, LearningStream):
            self.learningStream = tag
            self.tag = learningStream
class LearningStreamLearningPractices(Base.Model):
    __tablename__ = "learning_stream_learning_practices"
    learningStreamId = Column("learning_stream_id",BigInteger, ForeignKey("learning_streams.id"), primary_key = True)
    learningPracticeId = Column("learning_practice_id",BigInteger, ForeignKey("learning_practices.id"), primary_key = True)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    learningStream = relationship("LearningStream", 
        backref= backref("learningStreamLearningPractices", 
            cascade= "all, delete-orphan"),
        single_parent= True)
    learningPractice = relationship("LearningPractice", 
        backref = backref("learningStreamLearningPractices", 
            cascade = "all, delete-orphan"),
        single_parent= True)
    def __init__(self,learningPractice = None, learningStream = None, *args,**kwargs):
        super(LearningStreamLearningPractices, self).__init__(*args,**kwargs)
        if isinstance(learningPractice, LearningPractice):
            self.learningStream = learningStream
            self.learningPractice = learningPractice
        elif isinstance(learningPractice, LearningStream):
            self.learningStream = learningPractice
            self.learningPractice = learningStream