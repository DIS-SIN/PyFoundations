from sqlalchemy import Table, Column, BigInteger, ForeignKey
from .basemodel import Base


def __create_map_table__(table_name, source, destination):
    return Table(
        table_name,
        Base.Model.metadata,
        Column("id", BigInteger, primary_key=True),
        Column("source_id", BigInteger, ForeignKey(source + ".id")),
        Column("destination_id", BigInteger, ForeignKey(destination + ".id")),
        extend_existing=True,
    )


_map_info_ = [
    # Episodes Mappers
    ["m_Episodes_Tags", "episodes", "tags"],
    # ["m_Episodes_Likes", "episodes", "likes"],
    # ["m_Episodes_Media", "episodes", "media"],
    # ["m_Episodes_Images", "episodes", "media"],
    ["m_Episodes_Experiences", "episodes", "experiences"],
    # Experiences Mappers
    ["m_Experiences_Tags", "experiences", "tags"],
    ["m_Experiences_Skills", "experiences", "skills"],
    ["m_Experiences_Comments", "experiences", "comments"],
    # Knowledge Points Mappers
    ["m_KnowledgePoints_Tags", "knowledge_points", "tags"],
    # Learning Points Mappers
    ["m_LearningPoints_Tags", "learning_points", "tags"],
    ["m_LearningPoints_Episodes", "learning_points", "episodes"],
    ["m_LearningPoints_SubLearningPoints", "learning_points", "learning_points"],
    # Learning Practices Mappers
    ["m_LearningPractices_Tags", "learning_practices", "tags"],
    ["m_LearningPractices_Experiences", "learning_practices", "experiences"],
    ["m_LearningPractices_LearningPoints", "learning_practices", "learning_points"],
    # LearningResources Mappers
    ["m_LearningResources_Users", "learning_resources", "users"],
    ["m_LearningResources_Episodes", "learning_resources", "episodes"],
    ["m_LearningResources_Experiences", "learning_resources", "experiences"],
    # Learning Streams Mappers
    ["m_LearningStreams_Tags", "learning_streams", "tags"],
    ["m_LearningStreams_Experiences", "learning_streams", "experiences"],
    ["m_LearningStreams_LearningTargets", "learning_streams", "learning_targets"],
    ["m_LearningStreams_LearningPractices", "learning_streams", "learning_practices"],
    # Skills Mappers
    ["m_Skills_Tags", "skills", "tags"],
    ["m_Skills_LearningPoints", "skills", "learning_points"],
    ["m_Skills_KnowledgePoints", "skills", "knowledge_points"],
    # Users Mappers
    ["m_Users_Episodes", "users", "episodes"],
    ["m_Users_Experiences", "users", "experiences"],
    ["m_Users_UserProfiles", "users", "user_profiles"],
    ["m_Users_LearningStreams", "users", "learning_streams"],
    ["m_Users_LearningPratices", "users", "learning_practices"],
]


def make_maps():
    for map_info in _map_info_:
        __create_map_table__(map_info[0], map_info[1], map_info[2])
