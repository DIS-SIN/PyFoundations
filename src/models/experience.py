from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .learning_resource import LearningResource
from .tag import Tag
from .learning_practice import LearningPractice
from .skill import Skill
from .learning_stream import LearningStream
from .comment import Comment


class Experience(Base.Model):
    __tablename__ = "experiences"

    id = Column(
        BigInteger,
        Sequence("experience_id_seq"),
        primary_key=True,
        server_default=text("nextval('experience_id_seq'::regclass)"),
    )
    user_name = Column(Text)
    verb = Column(Text)
    occurred_at = Column(DateTime)
    validated = Column(Boolean)
    time = Column(BigInteger)
    value = Column(BigInteger)
    difficulty = Column(BigInteger)
    points = Column(BigInteger)
    depth = Column(BigInteger)
    learning_resource = relationship(
        "LearningResource",
        secondary="m_LearningResources_Experiences",
        backref=backref("m_LearningResources_Experiences.destination_id"),
        lazy="subquery",
    )
    tags = relationship(
        "Tag",
        secondary="m_Experiences_Tags",
        backref=backref("m_Experiences_Tags.source_id"),
        lazy="subquery",
    )
    learning_practices = relationship(
        "LearningPractice",
        secondary="m_LearningPractices_Experiences",
        backref=backref("m_LearningPractices_Experiences.destination_id"),
        lazy="subquery",
    )
    skills = relationship(
        "Skill",
        secondary="m_Experiences_Skills",
        backref=backref("m_Experiences_Skills.source_id"),
        lazy="subquery",
    )
    learning_stream = relationship(
        "LearningStream",
        secondary="m_LearningStreams_Experiences",
        backref=backref("m_LearningStreams_Experiences.destination_id"),
        lazy="subquery",
    )
    comments = relationship(
        "Comment",
        secondary="m_Experiences_Comments",
        backref=backref("m_Experiences_Comments.source_id"),
        lazy="subquery",
    )

    def __json_fields__(self):
        return [
            "id",
            "user_name",
            "verb",
            "occurred_at",
            "validated",
            "time",
            "value",
            "difficulty",
            "points",
            "depth",
        ]

    def __json_relationships__(self):
        return [
            ["learning_resource", LearningResource],
            ["tags", Tag],
            ["learning_practices", LearningPractice],
            ["skills", Skill],
            ["learning_stream", LearningStream],
            ["comments", Comment],
        ]

