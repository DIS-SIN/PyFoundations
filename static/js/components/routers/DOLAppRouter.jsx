import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLPageStub from "../views/DOLPageStub";
import DOLPageHome from "../views/DOLPageHome";
import DOLPageExplore from "../views/DOLPageExplore";
import DOLPageShare from "../views/DOLPageShare";
import DOLPageSearch from "../views/DOLPageSearch";
import DOLPageAbout from "../views/DOLPageAbout";
import DOLPageLearningStreams from "../views/DOLPageLearningStreams";
import DOLPageLearningPractices from "../views/DOLPageLearningPractices";
import DOLPageUserProfile from "../views/DOLPageUserProfile";
import DOLLayout from "../templates/DOLLayout";
import DOL404 from "../templates/DOL404";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLAppRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const langroutes = [
            { path: '/:lang/home', name: 'Home', Component: DOLPageHome },
            { path: '/:lang/explore', name: 'Explore', Component: DOLPageExplore },
            { path: '/:lang/streams', name: 'Streams', Component: DOLPageLearningStreams },
            { path: '/:lang/practices', name: 'Practices', Component: DOLPageLearningPractices },
            { path: '/:lang/share', name: 'Share', Component: DOLPageShare },
            { path: '/:lang/about', name: 'About', Component: DOLPageAbout },
            { path: '/:lang/profile', name: 'Profile', Component: DOLPageUserProfile },
            { path: '/:lang/search', name: 'Search', Component: DOLPageSearch },
            { path: '/:lang/logout', name: 'Logout', Component: DOLPageStub },
        ]
        const LanguifiedRoute = ({ match, location }) => (
            <Switch>
                {console.log('LanguifiedRoute: ' + match.url + "|" + match.path + "|" + match.params.route)}
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
                    {console.log('DOLAppRouter: ' + match.path + "|" + match.url)}
                    <Route path='/:route*' component={LanguifiedRoute} />
                </Switch>
            </React.Fragment>
        );
    }
}

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLAppRouter));


