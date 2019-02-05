from sqlalchemy import Column, Integer, String, DateTime, Sequence, Boolean
from sqlalchemy.dialects.postgresql import ARRAY, BIGINT

# LearningResource is an element of the learning architecture


class LearningResource:
    id = Column('ID', Integer, Sequence(
        'learning_resources_seq_id'), primary_key=True)
    author = Column('Author', String)
    copyright = Column('Copyright', Boolean)
    license = Column('License', String)
    title = Column('Title', String)
    description = Column('Description', String)
    path = Column('Path', String, unique=True)
    added_on = Column('AddedOn', DateTime)
    # TODO related to learning_points table
    learning_points = Column("LearningPoints", ARRAY(BIGINT, dimensions=1))
    # TODO related to knowledge_points table
    knowledge_points = Column("KnowledgePoints", ARRAY(BIGINT, dimensions=1))
    comments = Column('Comments', String)
    # TODO related to tags table
    tags = Column("Tags", ARRAY(BIGINT, dimensions=1))

# ID              int64 `schema: "-"`
# Author          string
# Copyright       bool
# Licence         string
# Title           string
# Description     string
# Path            string    `sql: ",unique"`
# AddedOn         time.Time `schema: "-"`
# LearningPoints[]*LearningPoint
# KnowledgePoints[]*KnowledgePoint
# Comments        string
# Tags[]string
