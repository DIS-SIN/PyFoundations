from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship
from .basemodel import Base
from .tag import Tag


class KnowledgePoint(Base.Model):
    __tablename__ = "knowledge_points"

    id = Column(
        BigInteger,
        Sequence("knowledge_point_id_seq"),
        primary_key=True,
        server_default=text("nextval('knowledge_point_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    tags = relationship("Tag", secondary="m_KnowledgePoints_Tags", lazy=False)

    def __json_fields__(self):
        return ["id", "name", "description", "slug"]

    def __json_relationships__(self):
        return [["tags", Tag]]

