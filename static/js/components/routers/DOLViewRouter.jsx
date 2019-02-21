import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageViewExperience from "../views/DOLPageViewExperience";
import DOLPageViewEpisode from "../views/DOLPageViewEpisode";
import DOLPageViewStream from "../views/DOLPageViewStream";
import DOLPageViewPractice from "../views/DOLPageViewPractice";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLViewRouter extends React.Component {
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

        const langroutes = [
            { path: '/:lang/view/experience', name: 'View Experience', Component: DOLPageViewExperience },
            { path: '/:lang/view/episode', name: 'View Episode', Component: DOLPageViewEpisode },
            { path: '/:lang/view/stream', name: 'View Stream', Component: DOLPageViewStream },
            { path: '/:lang/view/practice', name: 'View Practice', Component: DOLPageViewPractice },
        ]

        const LanguifiedRoute = ({ match, location }) => (
            <Switch>
                {langroutes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        <DOLLayout content={<Component location={location} />} />
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
export default withRouter(connect(mapStateToProps)(DOLViewRouter));
