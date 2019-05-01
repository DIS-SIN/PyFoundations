import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import literals from "./literals.js";
import lang from "./lang.js";
import streams from "./streams.js";
import error from "./error.js";

const loggerMiddleware = createLogger()

// mix the reducers together
const rootReducer = combineReducers({
    literals,
    lang,
    streams,
    error
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