# Application Routes

Mapping out what the MVP does

# PYDOL (Digital Open Learning, Python)
## Main Routes
/app#/en/home
/app#/en/about

## Profile 
/app#/en/profile
/app#/en/profile/update
/app#/en/profile/edit

## Find Content
/app#/en/explore
/app#/en/explore/streams
/app#/en/explore/practices
/app#/en/explore/experiences
/app#/en/explore/episodes
/app#/en/search

## Add Content
/app#/en/share
/app#/en/share/episode
/app#/en/share/experience
/app#/en/share/experience/(read|watch|listen|participate|study|do)

## View Single Content Item
/app#/en/view/episode
/app#/en/view/experience
/app#/en/view/stream
/app#/en/view/practice

## Edit Content
/app#/en/modify/episode
/app#/en/modify/experience

## Administration
/app#/en/login
/app#/en/logout
/app#/en/settings


# Foundations (Go)

## Main Routes

```bash
"/",                            SplashPageHandler
"/about/",                      AboutHandler
"/users/",                      UserIndexHandler
"/learner_profile/",            ViewLearnerProfileHandler
"/view_episode/{id}",           EpisodeHandler
```

## Auth/Config

```bash
"/signup/",                     SignUpFunc
"/login/",                      LoginFunc
"/logout/",                     LogoutFunc
"/google/login",                google.StateHa ... nil))
"/google/callback",             google.StateHa ... nil))
```

## CRUD Functions (Create Retrieve Update Delete)

```bash
"/new/",                        AddEpisodeHandler
"/add_experience/{verb}/",      AddExperienceHandler
"/modify/{id}",                 ModifyEpisodeHandler
"/delete/{id}",                 DeleteEpisodeHandler
"/delete_experience/{id}",      DeleteExperienceHandler
```

## Where is the project issues?

Check out our issues board in github