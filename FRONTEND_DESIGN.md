# Front End Design

The goal of the front end is to be as modular and composable as possible. The intention here is to allow us to pivot and change direction on what we are showing or how we are showing it easily. To enable new functions, it should be a small modular change without many side effects. To this end the front end code structure will follow an ATOMIC design. See: http://atomicdesign.bradfrost.com/chapter-2/

# Folder structure

## Static General Folders
* /static - the root of the front end
* /static/dist - the compiled js/css files the front end will use
* /static/css - the raw css we might need for pre-react styling
* /static/sass - the compilable CSS to feed into the app (note: most styling is done at the component level)
* /static/data - JSON files we might need for config, or other data
* /static/images - Images for the core application (not user supplied)
* /static/node_modules - The beast. Dev dependencies, will be compiled into the /dist bundle.js

## JS Folder - The code
* /static/js - the root of the react code
* /static/js/i18n - internationalization strings. EN/FR files.
* /static/js/lib - non-react JS libs we might need
* /static/js/store - React Redux store, provides statefulness
* /static/js/samples - Examples to help learn react
* /static/js/components - The actual components of the system

## JS Components (Atomic)
* /static/js/components/atoms - The smallest units of useful code
* /static/js/components/molecules - Built from atoms
* /static/js/components/organisms - Built from molecules and atoms
* /static/js/components/templates - The layouts general L&F
* /static/js/components/views - The implementations of a layout with content
* /static/js/components/routers - The url routers for the app

## Routing

* App > RootRouter > (LanguageSelectPage | AppRouter) > :PageRouters


:PageRouters
* ProfileRouter > :ProfilePages
* ExploreRouter > :ExplorePages
* ShareRouter > :SharePages
* SettingsRouter > :SettingsPages
* ModifyRouter > :ModifyPages
* ViewRouter > :ViewPages