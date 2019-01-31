from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
class Image(basemodel.Base):
    """Image class represents an image 
       postgres-table-name: images
       primary-key-series-name: images_seq_id
    """
    __tablename__ = "images"
    id = Column("ID", BIGINT, Sequence("images_seq_id"), primary_key = True)
    title = Column("Title", String)
    description = Column("Description", String)
    path = Column("Path", String)
    addedon = Column("AddedOn", DateTime)
    episode_id = Column("EpisodeID", ForeignKey("episodes.ID"))
    episodes = relationship("Episode", back_populates= "images") 
