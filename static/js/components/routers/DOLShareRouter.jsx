import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageShare from "../views/DOLPageShare";
import DOLPageShareEpisode from "../views/DOLPageShareEpisode";
import DOLPageShareExperience from "../views/DOLPageShareExperience";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLShareRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/share', name: 'Share', Component: DOLPageShare },
            { path: '/:lang/share/experience', name: 'Share Experience', Component: DOLPageShareExperience },
            { path: '/:lang/share/episode', name: 'Share Episode', Component: DOLPageShareEpisode },
        ]

        const LanguifiedRoute = ({ match, location }) => (
            <Switch>
                {langroutes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        <DOLLayout noFab={true} content={<Component location={location} />} />
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
export default withRouter(connect(mapStateToProps)(DOLShareRouter));
