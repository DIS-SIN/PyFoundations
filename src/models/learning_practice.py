from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag
from .learning_stream import LearningStream
from .learning_point import LearningPoint



class LearningPractice(Base.Model):
    __tablename__ = "learning_practices"

    id = Column(
        BigInteger,
        Sequence("learning_practice_id_seq"),
        primary_key=True
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    tags = association_proxy("learningPracticeTags", "tag")
    learningStreams = association_proxy("learningStreamLearningPractices", "learningStream")
    learningPoints = association_proxy("learningPracticeLearningPoints", "learningPoint")
    def __json_fields__(self):
        return ["id", "name", "description", "slug"]

    def __json_relationships__(self):
        return [
            ["tags", Tag],
            ["learningStreams",LearningStream],
            ["learningPoints", LearningPoint]
            ]
class LearningPracticeTags(Base.Model):
    __tablename__ = "learning_practice_tags"

    learningPracticeId = Column("learning_practice_id",BigInteger, ForeignKey("learning_practices.id"), primary_key = True)
    tagId = Column("tag_id",BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on",DateTime, server_default = text("now()"))
    learningPractice = relationship("LearningPractice", backref= backref("learningPracticeTags", cascade= "all, delete-orphan"))
    tag = relationship("Tag", backref = backref("learningPracticeTags", cascade= "all, delete-orphan"))
class LearningPracticeLearningPoints(Base.Model):
    __tablename__ = "learningPracticeLearningPoints"

    learningPracticeId = Column("learning_practice_id", BigInteger, ForeignKey("learning_practices.id"), primary_key = True)
    learningPointId = Column("learning_point_id",BigInteger, ForeignKey("learning_points.id"), primary_key = True)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    learningPractice = relationship("LearningPractice", backref = backref("learningPracticeLearningPoints", cascade = "all, delete-orphan"))  
    learningPoint = relationship("LearningPoint", backref= backref("learningPracticeLearningPoints", cascade= "all, delete-orphan"))      
