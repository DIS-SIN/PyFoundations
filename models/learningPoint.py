from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
class LearningPoint(basemodel.Base):
    __tablename__ = "learning_points"
    id = Column("ID",BIGINT, Sequence("learning_points_seq_id"), primary_key = True)
    name = Column("Name", String)
    description = Column("String", String)
    slug = Column("Slug", String)
    tags = Column("Tags", ARRAY(BIGINT, dimensions = 1))
    difficulty = Column("Difficulty", Integer)
    