from sqlalchemy import BigInteger, Column, Text, text, Sequence
from .basemodel import Base


class LearningTarget(Base.Model):
    __tablename__ = "learning_targets"
    id = Column(
        BigInteger,
        Sequence("learning_target_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_target_id_seq'::regclass)"),
    )
    target_name = Column(Text)

    def __json_fields__(self):
        return ["id", "target_name"]

