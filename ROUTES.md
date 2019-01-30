# Application Routes

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