// index.jsx - pull in required resources to allow webpack to bundle
//require('./../sass/dol.css.scss');
//require('./../sass/react-dol.scss');

//import 'typeface-roboto';

// core react+redux
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// our app
import App from "./App";
// i18n considerations
import { loadLiterals } from "./store/literals";
import store from "./store"; // from store/index.js
import loadLang from "./components/atoms/i18n";
import { loadStreams } from "./actions/FetchAllLearningStreams";

const lang = loadLang();
store.dispatch(loadLiterals(lang))
store.dispatch(loadStreams())

// render with redux store enabled
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
