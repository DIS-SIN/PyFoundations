import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLPageUserProfile from "../views/DOLPageUserProfile";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";
import DOLPageUserProfileUpdate from "../views/DOLPageUserProfileUpdate";
import DOLPageUserProfileEdit from "../views/DOLPageUserProfileEdit";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLProfileRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/profile', name: 'Profile', Component: DOLPageUserProfile },
            { path: '/:lang/profile/update', name: 'Update Profile', Component: DOLPageUserProfileUpdate },
            { path: '/:lang/profile/edit', name: 'Edit Profile', Component: DOLPageUserProfileEdit },
            { path: '/:lang/profile/add/stream', name: 'Add Stream to Profile', Component: DOLPageUserProfileEdit },
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
export default withRouter(connect(mapStateToProps)(DOLProfileRouter));
