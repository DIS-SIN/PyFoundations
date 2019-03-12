curl -i -X POST -H 'Content-Type: application/json' -d '{"title":"Episode Title", "tagline":"Episode Tagline Text", "sub_title":"Episode Subtitle Text", "body":"Episode Body Text", "likes":1, "slug":"episode-slug", "tags":[{"tag":"Episode Tag"}], "learning_point":{"name":"name", "tags":[{"tag":"Episode lp_t1"},{"tag":"Episode lp_t2"}]}}' http://localhost:5054/api/episode/

curl -i -X POST -H 'Content-Type: application/json' -d '{"user_name" : "First Last", "verb" : "verbage", "occurred_at" : "Mon, 04 Feb 2019 02:57:10 GMT", "validated" : false, "time" : "5", "value" : "10", "difficulty" : "15", "points" : "10", "depth" : "1", "tags" : [{"tag":"A"},{"tag":"B"}]}' http://localhost:5054/api/experience/

curl -i -X POST -H 'Content-Type: application/json' -d '{"name" : "My Knowledge Point", "description" : "This knowledge point is about this and that", "slug" : "knowledge-point-slug", "tags" : [{"tag":"knowledge point tag 1"},{"tag":"knowledge point tag 2"}]}' http://localhost:5054/api/knowledge_point/

curl -i -X POST -H 'Content-Type: application/json' -d '{ "name" : "My Learning Point", "description" : "This learning point is about this and that", "slug" : "learning-point-slug", "tags" : [{"tag":"learning point tag 1"},{"tag":"learning point tag 2"}], "difficulty" : "2"}' http://localhost:5054/api/learning_point/

curl -i -X POST -H 'Content-Type: application/json' -d '{ "name" : "My Learning Practice", "description" : "This learning practice is about this and that", "slug" : "learning-practice-slug", "tags" : [{"tag":"learning practice tag 1"},{"tag":"learning practice tag 2"}]}' http://localhost:5054/api/learning_practice/

curl -i -X POST -H 'Content-Type: application/json' -d '{"copyright":true, "licence":"MIT", "title":"Learning Resource Title", "description":"This learning resource is about this and that", "path":"www.example.com", "added_on" : "Mon, 04 Feb 2019 01:01:01 GMT"}' http://localhost:5054/api/learning_resource/

curl -i -X POST -H 'Content-Type: application/json' -d '{"name" : "My Learning Stream", "slug" : "learning-stream-slug", "tags" : [{"tag":"learning stream tag 1"},{"tag":"learning stream tag 2"}], "learning_targets":[{"target_name" : "learning stream target 1"}, {"target_name" : "learning stream target 2"}]}' http://localhost:5054/api/learning_stream/

curl -i -X POST -H 'Content-Type: application/json' -d '{"target_name" : "My Learning Target"}' http://localhost:5054/api/learning_target/

curl -i -X POST -H 'Content-Type: application/json' -d '{"name":"Skill Name", "description":"Skill Description", "slug":"skill-text", "tags":[{"tag":"Skill Tag"}], "learning_points":[{"name":"skill learning point", "tags":[{"tag":"skill_lp_t1"},{"tag":"skill_lp_t2"}]}], "knowledge_points":[{"name" : "My Knowledge Point", "description" : "This knowledge point is about this and that", "slug" : "knowledge-point-slug", "tags" : [{"tag":"skill knowledge point tag 1"},{"tag":"skill knowledge point tag 2"}]}]}' http://localhost:5054/api/skill/
