from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base
from .tag import Tag
from .learning_practice import LearningPractice
class LearningPoint(Base.Model):
    __tablename__ = "learning_points"
    id = Column(
        BigInteger,
        Sequence("learning_point_id_seq"),
        primary_key=True,
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    difficulty = Column(BigInteger)
    addedOn = Column("added_on",DateTime, server_default = text("now"))
    learningPractice = association_proxy("learningPracticeLearningPoints", "learningPractice")
    tags = association_proxy("learningPointTags", "tag")
    def __json_fields__(self):
        return [
        "id", 
        "name", 
        "description", 
        "slug", 
        "difficulty",
        "addedOn"
        ]

    def __json_relationships__(self):
        return [
            ["tags", Tag],
            ["learningPractice", LearningPractice]
            ]
class LearningPointTags(Base.Model):
    __tablename__ = "learning_point_tags"

    learningPointId = Column("learning_point_id", BigInteger, ForeignKey("learning_points.id"), primary_key = True)
    tagId = Column("tag_id", BigInteger, ForeignKey("tags.id"), primary_key = True)
    addedOn = Column("added_on", DateTime, server_default = text("now()"))
    tag = relationship("Tag", backref = backref("learningPointTags", cascade= "add, delete-orphan"))
    learningPoint = relationship("LearningPoint", backref= backref("learningPointTags", cascade = "add, delete-orphan"))

