from sqlalchemy import Column, Sequence, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import BIGINT
from sqlalchemy.orm import relationship
from . import basemodel

# Stream is an element of the learning architecture


class Stream(basemodel.Base):
    __tablename__ = 'streams'
    id = Column('ID', BIGINT, Sequence('streams_seq_id'), primary_key=True)
    name = Column('Name', String)
    slug = Column("Slug", String)
    # TODO Review relationship
    tags = Column('Tag', relationship('Tag'))
    tags_id = Column(Integer, ForeignKey("tag.id"))
#	ID   int64 `schema: "-"`
#	Name string
#	Tags[]*string
#	Slug string `schema: "-"`
