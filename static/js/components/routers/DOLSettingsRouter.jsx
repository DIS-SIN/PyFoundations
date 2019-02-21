import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageSettings from "../views/DOLPageSettings";
import DOLPageSettingsEdit from "../views/DOLPageSettingsEdit";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLSettingsRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/settings', name: 'Settings', Component: DOLPageSettings },
            { path: '/:lang/settings/edit', name: 'Edit Settings', Component: DOLPageSettingsEdit },
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
export default withRouter(connect(mapStateToProps)(DOLSettingsRouter));
