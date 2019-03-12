from sqlalchemy import BigInteger, Column, Text, text, Sequence
from sqlalchemy.orm import relationship, backref
from .basemodel import Base
from .tag import Tag


class LearningPoint(Base.Model):
    __tablename__ = "learning_points"

    id = Column(
        BigInteger,
        Sequence("learning_point_id_seq"),
        primary_key=True,
        server_default=text("nextval('learning_point_id_seq'::regclass)"),
    )
    name = Column(Text)
    description = Column(Text)
    slug = Column(Text)
    difficulty = Column(BigInteger)
    tags = relationship(
        "Tag",
        secondary="m_LearningPoints_Tags",
        backref=backref("m_LearningPoints_Tags.source_id"),
        lazy="subquery",
    )

    def __init_from_json__(self, json_data, model):
        JSON_INDEX = 0
        MODEL_INDEX = 1
        for f in self.__json_fields__():
            if f in json_data:
                setattr(self, f, json_data[f])
        if hasattr(self, "__json_relationships__"):
            for r in self.__json_relationships__():
                if r[JSON_INDEX] in json_data:
                    arr = []
                    for json_tag in json_data[r[JSON_INDEX]]:
                        new_obj = r[MODEL_INDEX]()
                        new_obj.__init_from_json__(json_tag)
                        arr.append(new_obj)
                    setattr(self, r[JSON_INDEX], arr)

    def __json_fields__(self):
        return ["id", "name", "description", "slug", "difficulty"]

    def __json_relationships__(self):
        return [["tags", Tag]]
