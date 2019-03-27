import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter, Router } from 'react-router-dom'
import { connect } from "react-redux";

import loadLangPack from "../atoms/i18n";
import { loadLiterals } from "../../store/literals";
import { loadLang } from "../../store/lang";
import store from "../../store";

import DOLPageHome from "../views/DOLPageHome";
import DOLPageAbout from "../views/DOLPageAbout";
import DOLPageLanguageSelect from '../views/DOLPageLanguageSelect';
import DOLPageExplore from '../views/DOLPageExplore';


import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import {ExploreRoutes} from "./DOLExploreRoutes";
import ModifyRoutes from "./DOLModifyRoutes";
import ProfileRoutes from "./DOLProfileRoutes";
import SamplesRoutes from "./DOLSamplesRoutes";
import ViewRoutes from "./DOLViewRoutes"; 

const mapStateToProps = state => {
    return {
        literals: state.literals,
        lang: state.lang
    };
};

const changeLanguage = lng => {
    const langpack = loadLangPack(lng);
    store.dispatch(loadLiterals(langpack));
    store.dispatch(loadLang(lng));
};


class DOLAppRouter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        const { literals, classes, match, lang } = this.props;
        const baseRoutes = [
            { path: '/:lang(en|fr)/home', name: 'Home', Component: DOLPageHome },
            { path: '/:lang(en|fr)/about', name: 'About', Component: DOLPageAbout },
        ]
        const routes = baseRoutes.concat(ExploreRoutes, ModifyRoutes, ProfileRoutes, SamplesRoutes, ViewRoutes)
        const Router = ({ match, location }) => (
            <Switch>
                {changeLanguage(match.params.lang)}
                {routes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        <DOLLayout content={<Component location={location} />} />
                    </Route>
                ))}
                <Route>
                    <DOLLayout content={<DOL404 location={location} />} />
                </Route>
            </Switch>
        )

        const NoLangRoute = ({ match }) => (
            <Switch>
                <Redirect to={'/' + ((lang == 'en' || lang == 'fr') ? lang : 'en') + '/' + match.params.route} />
                <Route component={DOL404} />
            </Switch>
        )

        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={DOLPageLanguageSelect} />
                    <Route path='/:lang(en|fr)/:route*' component={Router} />
                    <Route path='/:route*' component={NoLangRoute} />
                    <Route>
                        <DOLLayout content={<DOL404 location={location} />} />
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

DOLAppRouter.defaultProps = {
    lang: 'en'
};

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLAppRouter));


