from sqlalchemy import BigInteger, Column, Text, text, Sequence
from .basemodel import Base


class Comment(Base.Model):
    __tablename__ = "comments"

    id = Column(
        BigInteger,
        Sequence("comment_id_seq"),
        primary_key=True,
        server_default=text("nextval('comment_id_seq'::regclass)"),
    )
    comment = Column(Text)

    def __json_fields__(self):
        return ["id", "comment"]

