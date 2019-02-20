import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
// redux state
import { connect } from "react-redux";
import DOLSamplesRouter from "./DOLSamplesRouter";
import DOL404 from "../templates/DOL404";
import DOLAppRouter from "./DOLAppRouter";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLLocalizedRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;

        const LanguageSelect = ({ match }) => (
            <Switch>
                {console.log('LanguageSelect: ' + match.params.lang + "|" + match.url)}
                <Route path="/:route*">
                    <React.Fragment>
                        {console.log('-- route: ' + match.url)}
                        <Route path='/:route*' component={DOLAppRouter} />
                    </React.Fragment>
                </Route>
                <Route component={DOL404} />
            </Switch>
        )
        const NoLangRoute = ({ match }) => (
            <Switch>
                {console.log('NoLangRoute: ' + match.url)}
                {console.log('Redirect To: ' + '/en' + match.path)}
                <Redirect to={'/en/' + match.params.route} />
                <Route component={DOL404} />
            </Switch>
        )

        return (
            <React.Fragment>
                <Switch>
                    {console.log('DOLLocalizedRouter: ' + match.path + "|" + match.url)}
                    <Route path='/:lang(en|fr)/:route*' component={LanguageSelect} />
                    <Route path='/samples/:route*' component={DOLSamplesRouter} />
                    <Route path='/:route*' component={NoLangRoute} />
                </Switch>
            </React.Fragment>
        );
    }
}

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLLocalizedRouter));


