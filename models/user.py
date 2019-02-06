import datetime
from sqlalchemy import Column, Sequence, Boolean, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import ARRAY, BIGINT
import basemodel

# User implements a generic user model


class User(basemodel.Base):
    __tablename__ = 'users'
    id = Column('ID', Sequence('users_seq_id'), primary_key=True)
    username = Column('UserName', String, unique=True)
    email = Column('Email', String)
    password = Column('Password', String)
    is_admin = Column('IsAdmin', Boolean)
    # TODO related to learning profile table
    learner_profile = Column('LearnerProfile', ARRAY(BIGINT, dimensions=1))
    # TODO related to interests table
    interests = Column('Interests', ARRAY(BIGINT, dimensions=1))
    created_at = Column("CreatedAt", DateTime,
                        default=datetime.datetime.utcnow)
    updated_at = Column("UpdatedAt", DateTime)

#	ID             int64  `schema: "-"`
#	UserName       string `sql: ",unique"`
#	Email          string
#	Password       string
#	IsAdmin        bool            `schema: "-"`
#	LearnerProfile * LearnerProfile `schema: "-"`
#	Interests * InterestMap    `schema: "-"`
#	CreatedAt      time.Time       `sql: "default:now()" schema: "-"`
#	UpdatedAt      time.Time       `schema: "-"`
