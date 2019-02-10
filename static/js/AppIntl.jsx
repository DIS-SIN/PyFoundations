import React, { Component, Suspense } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

import { loadLiterals } from "./store/literals";
import store from "./store";
import loadLang from "./i18n";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

// hook to change language, fires a state change
const changeLanguage = lng => {
    const lang = loadLang(lng);
    store.dispatch(loadLiterals(lang));
};

const MyComponent = props => (
    <p>
        {props.literals.description.part1}
    </p>
);

const Page = props => (
    <div className="AppIntl">
        <div className="App-header">
            <button onClick={() => changeLanguage('fr')}>Français</button>
            <button onClick={() => changeLanguage('en')}>English</button>
        </div>
        <div className="App-intro">
            <MyComponent literals={props.literals} />
        </div>
        <div>{props.literals.description.part2}</div>
    </div>
);

class AppIntl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { literals } = this.props;
        return (
            <Page literals={literals} />
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(AppIntl);