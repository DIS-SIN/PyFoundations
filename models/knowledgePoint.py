from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
class knowledgePoint(basemodel.Base):
    id = Column("ID", BIGINT, Sequence("knowledge_points_seq_id"), primary_key = True)
    name = Column("Name", String)
    description = Column("Description", String)
    slug = Column("Slug", String)
    tags = Column("Tags", ARRAY(BIGINT, dimensions= 1))