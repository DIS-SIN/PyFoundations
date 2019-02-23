# REFACTORED DB DESIGN

## The Pattern Approach

We aim to have maxiumum flexibility for handling the data. We want to be able to provide an API that can bend and not break with the changes in the data model as we learn more about what works for the learners. To meet this objective we are aiming to created a template pattern we can follow to easily and modularly alter the DB.


* THINGS: DataTables [UID, RecordType, ...itemVariableProps]
* LABELS: LookupTables [LID, ...itemStaticData]
* RELATIONS: MappingTables [MID, MappingType, SRC_UID, DST_UID]


Any number of needed thing tables, relationships are represtned in mapping tables. Join the tables on the relationship to join together. 


This allows basically any THING to be related to another THING through a RELATIONSHIP. This allows us to flex if we decice to drop/add functionality. This also mirrors the front ends concept of having componentized routers for the paths to enable adding/removing front end functionality without requiring major refactoring.

Our aim is to be able to spend time coming up with a tempated pattern that just works, and then being able to have a consistent build process across this and other projects we build.


## Data Tables (Things)
* Tags
* Episodes
* Experiences
* KnowledgePoints
* Skills
* Users
* LearningStreams
* LearningPractices
* LearningTargets
* LearningResources
* LearningPoints

## Support Data Tables (Things's 'Extra' Data)
* UserProfiles (...userUniqueExtraData)
* Media (Images, Videos, Podcasts, Other?)
* Likes
* Comments

## Lookup Tables (Labels, Static Data)
* RecordTypes (1:Episode,2:Experience,)
* MappingTypes (1:TableA_TableB, 2:TableA_TableC)
* PointTypes (1:10, 2:50, 3: 100,)

## Mapping Tables
### Users Mappers
* m_Users_UserProfile
* m_Users_Streams
* m_Users_Pratices
* m_Users_Experiences
* m_Users_Episodes
### Streams Mappers
* m_Streams_Practices
* m_Streams_Experiences
* m_Streams_LearningTargets
* m_Streams_Tags
### Practices Mappers
* m_Practices_LearningPoints
* m_Practices_Experiences
* m_Practices_Tags
### KnowledgePoints Mappers
* m_KnowledgePoints_Tags
### LearningPoints Mappers
* m_LearningPoints_Tags
* m_LearningPoints_SubLearningPoints
* m_LearningPoints_Episodes
### LearningResources Mappers
* m_LearningResources_Users
* m_LearningResources_Experiences
* m_LearningResources_Episodes
### Skills Mappers
* m_Skills_LearningPoints
* m_Skills_KnowledgePoints
* m_Skills_Experiences
### Experiences Mappers
* m_Experiences_Tags
* m_Experiences_Comments
### Episodes Mappers
* m_Episodes_Experiences
* m_Episodes_Images
* m_Episodes_Media
* m_Episodes_Likes
* m_Episodes_Tags

## Unknowns
Edits
DigitalStandard
HomelandModel
OccupationModels

