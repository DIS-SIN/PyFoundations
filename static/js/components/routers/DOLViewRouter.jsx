import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

import DOLPageViewExperience from "../views/DOLPageViewExperience";
import DOLPageViewEpisode from "../views/DOLPageViewEpisode";
import DOLPageViewStream from "../views/DOLPageViewStream";
import DOLPageViewPractice from "../views/DOLPageViewPractice";
import DOLViewLayout from "../templates/DOLViewLayout";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLViewRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/view/experience/:id', name: 'View Experience', Component: DOLPageViewExperience },
            { path: '/:lang/view/episode/:id', name: 'View Episode', Component: DOLPageViewEpisode },
            { path: '/:lang/view/stream/:id', name: 'View Stream', Component: DOLPageViewStream },
            { path: '/:lang/view/practice/:id', name: 'View Practice', Component: DOLPageViewPractice },
        ]

        const IdRoute = ({ match, location }) => (
            <Switch>
                {langroutes.map(({ path, Component }) => (
                    <Route key={path} exact path={path}>
                        <React.Fragment>
                            {/*console.log(match.params.id)*/}
                            <DOLViewLayout content={<Component location={location} fetchid={match.params.id} />} />
                        </React.Fragment>
                    </Route>
                ))}
                <Route>
                    <DOLLayout content={<DOL404 location={location} />} />
                </Route>
            </Switch>
        )
        const LanguifiedRoute = ({ match, location }) => (
            <React.Fragment>
                <Switch>
                    <Route path='/:lang/view/:item/:id' component={IdRoute} />
                    <Route>
                        <DOLLayout content={<DOL404 location={location} />} />
                    </Route>
                </Switch>
            </React.Fragment>
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
