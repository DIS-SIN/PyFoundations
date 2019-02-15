from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Text,
    text,
    Table,
)
from sqlalchemy.orm import relationship
from .basemodel import Base
from .tags import Tag

# Status: Prototype Done, Mapping from real db TODO


class LearningPoint(Base):
    __tablename__ = "learning_points"

    id = Column(
        BigInteger,
        primary_key=True,
        server_default=text("nextval('learning_point_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    difficulty = Column(Integer)
    tags = relationship("Tag", secondary="learning_points_tags", lazy=False)

    # Function for specifying which fields should be
    # read when serialising into JSON
    def __json__(self):
        return ["name", "description", "slug", "difficulty", "tags"]


keywords = Table(
    "learning_points_tags",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("learning_point_id", Integer, ForeignKey("learning_points.id")),
    Column("tag_id", Integer, ForeignKey("tags.id")),
)
