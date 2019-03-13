from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag
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
    addedOn = Column("added_on", DateTime, server_default = text("now"))
    slug = Column(Text)
    tags = association_proxy("learningStreamTags", "tag")
    learningPractices = association_proxy("learningStreamLearningPractices", "learningPractice")

    def __json_fields__(self):
        return ["id", "name", "slug", "expertise"]

    def __json_relationships__(self):
        return [["tags", Tag]]

class LearningStreamTags(Base.Model):
    __tablename__ = "learning_stream_tags"

    learningStreamId = Column("learning_stream_id",BigInteger, ForeignKey("learning_streams.id"), primary_key = True)
    tagId = Column("tag_id",BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    learningStream = relationship("LearningStream", backref= backref("learningStreamTags", cascade= "all, delete-orphan"))
    tag = relationship("Tag", backref = backref("learningStreamTags"), cascade= "all, delete-orphan")

class LearningStreamLearningPractices(Base.Model):
    __tablename__ = "learning_stream_learning_practices"

    learningStreamId = Column("learning_stream_id",BigInteger, ForeignKey("learning_treams.id"), primary_key = True)
    learningPracticeId = Column("learning_practice_id",BigInteger, ForeignKey("learning_practices.id"), primary_key = True)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    learningStream = relationship("LearningStream", backref= backref("learningStreamLearningPractices", cascade= "all, delete-orphan"))
    learningPractice = relationship("LearningPractice", backref = backref("learningPracticeLearningStreams", cascade = "all, delete-orphan"))