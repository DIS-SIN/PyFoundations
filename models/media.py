from sqlalchemy import Column, Integer, String, DateTime, Sequence
from sqlalchemy.dialects.postgresql import ARRAY, BIGINT


# Video is the image and path for an Image
class Video:
    id = Column('ID', Integer, Sequence(
        'videos_seq_id'), primary_key=True)
    title = Column('Title', String)
    description = Column('Description', String)
    path = Column('Path', String)
    added_on = Column('AddedOn', DateTime)
    # TODO related to learning_points table
    learning_points = Column("LearningPoints", ARRAY(BIGINT, dimensions=1))

# 	ID             int64 `schema: "-"`
# 	Title          string
# 	Description    string
# 	Path           string
# 	LearningPoints[]*LearningPoint
# 	AddedOn        time.Time `schema: "-"`

# Podcast is the image and path for an Image


class Podcast:
    id = Column('ID', Integer, Sequence(
        'podcasts_seq_id'), primary_key=True)
    title = Column('Title', String)
    description = Column('Description', String)
    path = Column('Path', String)
    added_on = Column('AddedOn', DateTime)
    # TODO related to learning_points table
    learning_points = Column("LearningPoints", ARRAY(BIGINT, dimensions=1))

    #     ID             int64 `schema: "-"`
    #     Title          string
    #     Description    string
    #     Path           string
    #     LearningPoints[]*LearningPoint
    #     AddedOn time.Time `schema: "-"`
