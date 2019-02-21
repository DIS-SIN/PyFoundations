import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageModifyExperience from "../views/DOLPageModifyExperience";
import DOLPageModifyEpisode from "../views/DOLPageModifyEpisode";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLModifyRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/modify/experience', name: 'Modify Experience', Component: DOLPageModifyExperience },
            { path: '/:lang/modify/episode', name: 'Modify Episode', Component: DOLPageModifyEpisode },
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
export default withRouter(connect(mapStateToProps)(DOLModifyRouter));
