from sqlalchemy import Column, Integer, String, DateTime, Sequence, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY, JSON, BIGINT
from sqlalchemy.orm import relationship
import basemodel 
class Edit(basemodel.Base):
    __tablename__ = "edits"
    edit_id = Column('ID', BIGINT, Sequence("edits_id_seq"), primary_key = True)
    description = Column("Description", String)
    date = Column("Date", DateTime)
    episode_id = Column(BIGINT, ForeignKey("episodes.ID"))
    episodes = relationship("Episode", back_populates= "edits")
class Episode(basemodel.Base):
    __tablename__ = 'episodes'
    episode_id = Column('ID', BIGINT, Sequence("episodes_id_seq"), primary_key = True)
    title = Column('Title', String)
    tagline = Column('Tagline', String)
    subtitle = Column('SubTitle', String)
    author = Column('Author', BIGINT) #to be related to User table 
    image = Column('Image', BIGINT) #to be related to image table
    videos = Column("Videos", ARRAY(BIGINT, dimensions = 1)) #To be related to videos table
    podcasts = Column("Podcasts", ARRAY(BIGINT, dimensions = 1)) #To be related to podcasts table 
    likes = Column("Likes", Integer)
    publishedon = Column("Publishedon", DateTime)
    edits = relationship("Edit", order_by= Edit.date, back_populates="episodes")
    tags = Column("Tags", ARRAY(String, dimensions =1))
    learningpoints = Column("LearningPoint", ARRAY(BIGINT, dimensions = 1)) #to be related to learning points table
    learningresources = Column('LearningResource', ARRAY(BIGINT, dimensions = 1)) # to be related to learning resources table
    experience = Column('Experience', BIGINT) # to be related to experience table
    digitalstandards = Column('DigitalStandards', ARRAY(String, dimensions = 1))
    bannerimage = Column("BannerImage", BIGINT) # to be related to images table
    slug = Column('slug', String)
