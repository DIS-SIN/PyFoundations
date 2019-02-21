import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageExplore from "../views/DOLPageExplore";
import DOLPageLearningStreams from "../views/DOLPageLearningStreams";
import DOLPageLearningPractices from "../views/DOLPageLearningPractices";
import DOLPageEpisodes from "../views/DOLPageEpisodes";
import DOLPageExperiences from "../views/DOLPageExperiences";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLExploreRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/explore', name: 'Explore', Component: DOLPageExplore },
            { path: '/:lang/explore/streams', name: 'Streams', Component: DOLPageLearningStreams },
            { path: '/:lang/explore/practices', name: 'Practices', Component: DOLPageLearningPractices },
            { path: '/:lang/explore/experiences', name: 'Experiences', Component: DOLPageExperiences },
            { path: '/:lang/explore/episodes', name: 'Episodes', Component: DOLPageEpisodes },
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
export default withRouter(connect(mapStateToProps)(DOLExploreRouter));
