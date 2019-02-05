from sqlalchemy import Column, String
# Text is a struct containing FR/EN text content


class Text:
    en = Column('EN', String)
    fr = Column('FR', String)

#	en string
#	fr string
