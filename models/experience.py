from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
class ExperienceComments(basemodel.Base):
    """ExperienceComments class represents a comment on an experience
       postgres-table-name: experience_comments
       primary-key-series-name: experience_comments_seq_id
    """
    __tablename__ = "experience_comments"
    id = Column("ID", Integer, Sequence("experience_comments_seq_id"), primary_key = True)
    comment = Column("Comment", String)
    timestamp = Column("TimeStamp", DateTime)
    experience_id = Column("ExprienceID", BIGINT, ForeignKey("experiences.ID"))
    experiences = relationship("Experience", back_populates= "comments") 
class Experience(basemodel.Base):
    """Experience class represents a experience
       postgres-table-name: experiences
       primary-key-series-name: experiences_seq_id
    """
    __tablename__ = "experiences"
    id = Column("ID", Integer, Sequence("experiences_seq_id"), primary_key = True)
    username = Column("UserName", String)
    verb = Column("Verb", String)
    stream = Column("Stream", BIGINT) #relate to stream table
    practices = Column("Practice", ARRAY(BIGINT, dimensions = 1)) #relate to Practice table
    skills = Column("Skill", ARRAY(BIGINT, dimensions = 1)) # relate to skills table
    learningresourceid = Column("LearningResourceID", BIGINT) # relate to learning resource table 
    #LearningResource *LearningResource (relationship)
    occuredat = Column("OccuredAt", DateTime)
    validated = Column("Validated", Boolean)
    time = Column("Time", Integer)
    value = Column("Value", Integer)
    difficulty = Column("Difficulty", Integer)
    points = Column("Points", Integer)
    depth = Column("Depth", Integer)
    comments = relationship("ExperienceComments", order_by= ExperienceComments.timestamp, back_populates= "experiences")    
    tags = Column("Tags", ARRAY(BIGINT, dimensions = 1))