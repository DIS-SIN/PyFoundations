from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.dialects.postgresql import ARRAY, BIGINT
import basemodel

# Practice is an element of the learning architecture


class Practice(basemodel.Base):
    __tablename__ = 'practices'
    id = Column('ID', Integer, Sequence(
        'practices_seq_id'), primary_key=True)
    name = Column('Name', String)
    description = Column('Description', String)
    # TODO related to tags table
    tags = Column("Tags", ARRAY(BIGINT, dimensions=1))
    slug = Column("Slug", String)

# ID          int64 `schema: "-"`
# Name        string
# Description string
# Tags[]*string
# Slug string `schema: "-"`
