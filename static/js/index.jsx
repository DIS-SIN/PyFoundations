// index.jsx - pull in required resources to allow webpack to bundle
//require('./../sass/dol.css.scss');
//require('./../sass/react-dol.scss');
require('./../sass/react-mui-pf.scss');

//import 'typeface-roboto';

// core react+redux
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from 'react-router-dom';

// our app
import App from "./App";
// i18n considerations
import { loadLiterals } from "./store/literals";
import store from "./store"; // from store/index.js
import loadLang from "./components/atoms/i18n";

const lang = loadLang();
store.dispatch(loadLiterals(lang))
//console.log(store);

// render with redux store enabled
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
