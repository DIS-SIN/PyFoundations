from sqlalchemy import BigInteger, Column, text, Sequence, DateTime
from .basemodel import Base


class Like(Base.Model):
    __tablename__ = "likes"

    id = Column(
        BigInteger,
        Sequence("like_id_seq"),
        primary_key=True,
        server_default=text("nextval('like_id_seq'::regclass)"),
    )
    added_on = Column(DateTime)

    def __json_fields__(self):
        return ["id", "added_on"]

