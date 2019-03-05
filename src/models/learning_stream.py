from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag
from .learning_target import LearningTarget


class LearningStream(Base.Model):
    __tablename__ = "learning_streams"

    id = Column(
        BigInteger,
        Sequence("learning_stream_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_stream_id_seq'::regclass)"),
    )
    name = Column(Text)
    slug = Column(Text)
    expertise = Column(BigInteger)
    tags = relationship(
        "Tag",
        secondary="m_LearningStreams_Tags",
        backref=backref("m_LearningStreams_Tags.source_id"),
        lazy="subquery",
    )
    learning_targets = relationship(
        "LearningTarget",
        secondary="m_LearningStreams_LearningTargets",
        backref=backref("m_LearningStreams_LearningTargets.source_id"),
        lazy="subquery",
    )

    def __json_fields__(self):
        return ["id", "name", "slug", "expertise"]

    def __json_relationships__(self):
        return [["tags", Tag], ["learning_targets", LearningTarget]]

