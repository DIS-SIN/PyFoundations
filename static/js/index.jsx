// index.jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import App from "./App";
//import AppIntl from "./AppIntl";

require('./../sass/pyfoundations.css.scss');

//ReactDOM.render(<App />, document.getElementById("root"));
// append app to dom
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
