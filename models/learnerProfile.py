from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
import experience
class LearnerProfile(basemodel.Base):
    __tablename__ = "learner_profiles"
    id = Column("ID", Sequence("learner_profiles_seq_id"), primary_key = True)
    experiences = relationship("Experience", order_by = experience.Experience.occuredat, back_populates="learner_profiles")
    learningtargets = Column("LearningTargets", JSON)
    currentyear = Column("CurrentYear", JSON)
    slug = Column("Slug", String)