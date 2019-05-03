import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import literals from "./literals"
import lang from "./lang"
import streams from "./streams"
import notice from "./notice"
import adminConsoleContent from './adminConsoleContent'
import contentStatus from './contentStatus'

const loggerMiddleware = createLogger()

// mix the reducers together
const rootReducer = combineReducers({
    literals,
    lang,
    streams,
    notice,
    adminConsoleContent,
    contentStatus,
    // other reducers...
});

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    )
 )

// get the store ready for the app to use
export default store;