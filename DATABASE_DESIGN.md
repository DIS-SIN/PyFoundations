# REFACTORED DB DESIGN

## Data Tables
Tags
Episodes
Experiences
KnowledgePoints
Skills
Users
UserProfiles
LearningStreams
LearningPractices
LearningTargets
LearningResources
LearningPoints

## Support Data Tables
Images
Media (Images, Videos)
Likes
Comments

## Lookup Tables
RecordTypes (1:Episode,2:Experience,)
MappingTypes (1:TableA_TableB, 2:TableA_TableC)
PointTypes (1:10, 2:50, 3: 100,)

## Mapping Tables
m_Users_UserProfile
m_Users_Streams
m_Users_Pratices
m_Users_Experiences
m_Users_Episodes

m_Streams_Practices
m_Streams_Experiences
m_Streams_LearningTargets
m_Streams_Tags

m_Practices_LearningPoints
m_Practices_Experiences
m_Practices_Tags

m_KnowledgePoints_Tags

m_LearningPoints_Tags
m_LearningPoints_SubLearningPoints
m_LearningPoints_Episodes

m_LearningResources_Users
m_LearningResources_Experiences
m_LearningResources_Episodes

m_Skills_LearningPoints
m_Skills_KnowledgePoints
m_Skills_Experiences

m_Experiences_Tags
m_Experiences_Comments

m_Episodes_Experiences
m_Episodes_Images
m_Episodes_Media
m_Episodes_Likes
m_Episodes_Tags







## Unknowns
Edits
DigitalStandard
HomelandModel
OccupationModels

# How we want to structure the back end data

Have basic object tables like

Things [UID, ThingType, DataDetails]
Relationships [UID, RelationType, ID_Thing1, ID_Thing2]

Any number of needed thing tables, relationships are represtned in mapping tables. Join the tables on the relationship to join together.

This allows basically any THING to be related to another THING through a RELATIONSHIP. This allows us to flex

Authors
    id
    src_id
    dst_id

Episode
    id
    title
    tageline
    sub_title
    body
    .author
    .images
    .videos
    .podcasts
    #likes
    published_on
    .edits (store json of edit)
    .tags
    .learning_points
    .learning_resources
    .experience
    digital_standard
