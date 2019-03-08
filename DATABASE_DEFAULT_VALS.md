# Practices
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (0, 'Inclusive Design', 'Inclusive Design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (1, 'Design thinking', 'Design thinking', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (2, 'Service design', 'Service design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (3, 'Circular design', 'Circular design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (4, 'Design research', 'Design research', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (5, 'Content strategy', 'Content strategy', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (6, 'Information architecture', 'Information architecture', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (7, 'Content design', 'Content design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (8, 'Visual design', 'Visual design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (9, 'Interaction design', 'Interaction design', 'slug');
INSERT INTO public.learning_practices(id, name, description, slug) VALUES (10, 'Usability testing', 'Usability testing', 'slug');

# Streams
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (0, 'Digital Government', '/static/images/covers/digital_government.png', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (1, 'Digital Literacy','/static/images/covers/digital_literacy.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (2, 'Design', '/static/images/covers/design.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (3, 'Leadership', '/static/images/covers/leadership.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (4, 'Disruptive Technology', '/static/images/covers/disruptive.png', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (5, 'Data Analysis', '/static/images/covers/data_analysis.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (6, 'AI / Machine Learning', '/static/images/covers/ai.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (7, 'DevOps', '/static/images/covers/devops.jpg', 0);
INSERT INTO public.learning_streams(id, name, slug, expertise) VALUES (8, 'Development', '/static/images/covers/development.jpg', 0);

# LR
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (1,null,null,null,'Learn how to write a file using Golang - golangbot.com','Learn how to write a file using Golang - golangbot.com','https://golangbot.com/write-files/','2019-01-29 14:48:49.511181-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (2,null,null,null,'How will Ottawa build a successful digital government?','How will Ottawa build a successful digital government?','http://policyoptions.irpp.org/magazines/january-2019/how-will-ottawa-build-a-successful-digital-government/','2019-01-29 16:06:09.078323-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (3,null,null,null,'Episodes','Episodes','https://foundationsapp.herokuapp.com','2019-01-29 23:39:27.57511-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (4,null,null,null,'Charlene Li: Efficient leadership in the digital era | TED Talk','Charlene Li: Efficient leadership in the digital era | TED Talk','https://www.ted.com/talks/charlene_li_efficient_leadership_in_the_digital_era/up-next','2019-01-30 08:41:26.82249-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (5,null,null,null,'Transforming the way we work: ISED&#39;s story - YouTube','Transforming the way we work: ISED&#39;s story - YouTube','https://youtu.be/RpdXnbuVMgQ','2019-01-30 09:43:48.310945-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (6,null,null,null,'Scraping the Web in Golang with Colly and Goquery | Ben Congdon','Scraping the Web in Golang with Colly and Goquery | Ben Congdon','https://benjamincongdon.me/blog/2018/03/01/Scraping-the-Web-in-Golang-with-Colly-and-Goquery/','2019-01-30 11:26:48.887691-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (7,null,null,null,'GitHub - afjoseph/RAKE.Go: A Go port','GitHub - afjoseph/RAKE.Go: A Go port of the Rapid Automatic Keyword Extraction algorithm (RAKE)','https://github.com/afjoseph/RAKE.Go','2019-01-30 11:38:43.942688-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (9,null,null,null,'GitHub - jdkato/prose: A Golang library ','GitHub - jdkato/prose: A Golang library for text processing, including tokenization, part-of-speech tagging, and named-entity extraction.','https://github.com/jdkato/prose','2019-01-30 19:18:05.665742-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (10,null,null,null,'GitHub - ToferC/foundations','GitHub - ToferC/foundations: MVP for foundations for digital academy','https://github.com/ToferC/foundations','2019-01-30 20:38:40.829459-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (8,null,null,null,'Medium: Another Startup','Medium: Another Startup','https://link.medium.com/kU6NFXoCUT','2019-01-30 19:16:24.01707-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (11,null,null,null,'Singularity University','Singularity University','https://su.org','2019-01-31 10:40:29.144682-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (12,null,null,null,'The Open Source Computer','The Open Source Computer Science Degree - YouTube','https://youtu.be/NyOvFSP_IpQ','2019-02-01 16:39:07.086012-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (13','Chris Allison','Busrides - Episode 2','Busrides - Episode 2','How to publish in 24 hours','/view_episode/chris-allison-busrides-episode-2','2019-02-03 21:57:50.582019-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (14,null,null,null,'2018 Major Updates','2018 Major Updates to the Most Popular Data Science Frameworks','https://opendatascience.com/2018-major-updates-to-the-most-popular-data-science-frameworks/?utm_campaign=Newsletters&utm_source=hs_email&utm_medium=email&utm_content=69482705&_hsenc=p2ANqtz-83BH3-nezZjFWdsPTZ0sXTiLr-RL9mUBzKWzRgDknExhgKQpTr0_35bH3T57pS45CUgEpRdEx7ri7Y0wYY9jZHU_gcBA&_hsmi=69482705','2019-02-04 07:58:08.465654-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (15,null,null,null,'For e-government to flourish','For e-government to flourish, policy-making must change','http://policyoptions.irpp.org/magazines/january-2019/for-e-government-to-flourish-policy-making-must-change/','2019-02-04 08:16:15.501217-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (16,null,null,null,'Episode 2: AI, YouTube ','Episode 2: AI, YouTube and publishing in two languages fast!','https://en.busrides-trajetsenbus.ca/episode-2/','2019-02-04 11:18:26.272822-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (17,null,null,null,'Leadership in a Digital Era','Leadership in a Digital Era - Digital Leaders Blog - Future Digital Leaders','https://www.futuredigitalleaders.com/blog/leadership-in-a-digital-era?context=tag-digital+leadership','2019-02-04 19:51:39.360537-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (18,null,null,null,'u.lab: Leading','u.lab: Leading From the Emerging Future','https://www.edx.org/course/ulab-leading-from-the-emerging-future-15-671-1x-1','2019-02-05 17:49:40.105841-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (19,null,null,null,'Web scraping in Python','Web scraping in Python','https://www.codementor.io/blog/python-web-scraping-63l2v9sf2q?utm_content=posts&utm_source=sendgrid&utm_medium=email&utm_term=post-546ttpb9nd&utm_campaign=newsletter20190206','2019-02-06 13:47:42.602196-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (20,null,null,null,'Python Bootcamp For ML','Python Bootcamp For ML – Hacker Noon','https://hackernoon.com/python-bootcamp-for-ml-c321177b957e','2019-02-06 15:24:37.767865-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (21,null,null,null,'The Science of Well-being','The Science of Well-being','https://www.coursera.org/learn/the-science-of-well-being','2019-02-06 18:33:09.811307-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (22,null,null,null,'This is the best Steel','This is the best Steel Battalion cockpit. Ever. - Polygon','https://www.google.com/amp/s/www.polygon.com/platform/amp/2015/4/10/8382387/steel-battalion-cockpit-bsbb','2019-02-08 16:07:31.417361-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (23,null,null,null,'PySpark in Google Colab','PySpark in Google Colab – Towards Data Science','https://towardsdatascience.com/pyspark-in-google-colab-6821c2faf41c','2019-02-09 20:54:49.787792-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (24','Matthew Clements','Episode','Episode','Tagline','/view_episode/matthew-clements-episode','2019-02-11 10:33:41.049359-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (25,null,null,null,'GitHub - jordan-wright','GitHub - jordan-wright/email: Robust and flexible email library for Go','https://github.com/jordan-wright/email','2019-02-12 20:37:05.044847-05');
INSERT INTO public.learning_resources(id, author, copyright, licence, title, description, path, added_on)
VALUES (26,null,null,null,'How DevOps is dictating','How DevOps is dictating a new approach to cloud development','https://techbeacon.com/app-dev-testing/devops-dictates-new-approach-cloud-development','2019-02-15 16:46:00.522927-05');
