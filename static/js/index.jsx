// index.jsx - pull in required resources to allow webpack to bundle
//require('./../sass/pyfoundations.css.scss');
//require('./../sass/react-pyfoundations.scss');
require('./../sass/react-mui-pf.scss');

//import 'typeface-roboto';

// core react+redux
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';


// our app
import App from "./App";
// i18n considerations
import { loadLiterals } from "./store/literals";
import store from "./store"; // from store/index.js
import loadLang from "./i18n";
import { CssBaseline } from "@material-ui/core";
import AppReactShowcase from "./AppReactShowcase";
import AppReactDOL from "./AppReactDOL";
const lang = loadLang();
store.dispatch(loadLiterals(lang))
//console.log(store);

// render with redux store enabled
/*
ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>,
    document.getElementById("root")
);*/

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);


