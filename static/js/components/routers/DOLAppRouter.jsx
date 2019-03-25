import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLPageStub from "../views/DOLPageStub";
import DOLPageHome from "../views/DOLPageHome";
import DOLPageSearch from "../views/DOLPageSearch";
import DOLPageAbout from "../views/DOLPageAbout";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";
import DOLProfileRouter from "./DOLProfileRouter";
import DOLExploreRouter from "./DOLExploreRouter";
import DOLShareRouter from "./DOLShareRouter";
import DOLSettingsRouter from "./DOLSettingsRouter";
import DOLModifyRouter from "./DOLModifyRouter";
import DOLViewRouter from "./DOLViewRouter";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLAppRouter extends React.Component {
    /**
     
    # PYDOL (Digital Open Learning, Python)
    ## Main Routes
    /app#/en/home
    /app#/en/about
    
    ## Profile
    /app#/en/profile
    /app#/en/profile/update
    /app#/en/profile/edit
    
    ## Find Content
    /app#/en/explore
    /app#/en/explore/streams
    /app#/en/explore/practices
    /app#/en/explore/experiences
    /app#/en/explore/episodes
    /app#/en/search
    
    ## Add Content
    /app#/en/share
    /app#/en/share/episode
    /app#/en/share/experience
    /app#/en/share/experience/(read|watch|listen|participate|study|do)
    
    ## View Single Content Item
    /app#/en/view/episode
    /app#/en/view/experience
    /app#/en/view/stream
    /app#/en/view/practice
    
    ## Edit Content
    /app#/en/modify/episode
    /app#/en/modify/experience
    /app#/en/modify/stream
    /app#/en/modify/practice
    
    ## Administration
    /app#/en/login
    /app#/en/logout
    /app#/en/settings
    
     
     */
    render() {
        const { literals, classes, match } = this.props;
        const routers = [
            { path: '/:lang/profile', name: 'Profile', Component: DOLProfileRouter },
            { path: '/:lang/explore', name: 'Explore', Component: DOLExploreRouter },
            { path: '/:lang/share', name: 'Share', Component: DOLShareRouter },
            { path: '/:lang/settings', name: 'Settings', Component: DOLSettingsRouter },
            { path: '/:lang/modify', name: 'Modify', Component: DOLModifyRouter },
            { path: '/:lang/view', name: 'View', Component: DOLViewRouter },
        ]
        const langroutes = [
            { path: '/:lang/home', name: 'Home', Component: DOLPageHome },
            { path: '/:lang/about', name: 'About', Component: DOLPageAbout },
            { path: '/:lang/search', name: 'Search', Component: DOLPageSearch },
            { path: '/:lang/login', name: 'Login', Component: DOLPageStub },
            { path: '/:lang/logout', name: 'Logout', Component: DOLPageStub },
        ]
        const LanguifiedRoute = ({ match, location }) => (
            <Switch>
                {langroutes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        <DOLLayout content={<Component location={location} />} />
                    </Route>
                ))}
                {routers.map(({ path, Component }) => (
                    <Route key={path} path={path}>
                        <Component location={location} />
                    </Route>
                ))}
                <Route>
                    <DOLLayout content={<DOL404 location={location} />} />
                </Route>
            </Switch>
        )

        return (
            <React.Fragment>
                <Switch>
                    <Route path='/:route*' component={LanguifiedRoute} />
                </Switch>
            </React.Fragment>
        );
    }
}

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLAppRouter));


