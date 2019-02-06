from sqlalchemy import Column, String
import basemodel

# Text is a struct containing FR/EN text content


class Text(basemodel.Base):
    __tablename__ = 'texts'
    en = Column('EN', String)
    fr = Column('FR', String)

#	en string
#	fr string
