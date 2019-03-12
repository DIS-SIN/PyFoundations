from sqlalchemy import BigInteger, Column, Text, text, Sequence, DateTime
from sqlalchemy.ext.associationproxy import association_proxy
from .basemodel import Base


class Tag(Base.Model):
    __tablename__ = "tags"

    id = Column(
        BigInteger,
        Sequence("tag_id_seq"),
        primary_key=True,
        server_default=text("nextval('tag_id_seq'::regclass)"),
    )
    tag = Column(Text)
    added_on = Column(DateTime, server_default=text("now()"))
    episodes = association_proxy("episodeTags", "episode")
    def __json_fields__(self):
        return ["id", "tag", "added_on"]
