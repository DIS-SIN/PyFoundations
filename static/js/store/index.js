import { createStore, combineReducers } from "redux";
import literals from "./literals.js";

// mix the reducers together
const rootReducer = combineReducers({
    literals//,
    // other reducers...
});

const store = createStore(rootReducer);

// get the store ready for the app to use
export default store;
