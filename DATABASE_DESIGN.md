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
