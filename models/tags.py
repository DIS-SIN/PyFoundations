from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
import basemodel 
class Tags(basemodel.Base):
    __tablename__ = "tags"
    id = Column("ID", BIGINT, Sequence("tags_seq_id"), primary_key = True)
    tag = Column("Tag", String)
    addedon = Column("AddedOn", DateTime)