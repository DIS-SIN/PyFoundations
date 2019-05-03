import React from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";

import DOLPageAdminConsole from "../components/views/DOLPageAdminConsole";
import DOLPageOpenRegistry from "../components/views/DOLPageOpenRegistry"
import DOLPageLanguageSelect from "../components/views/DOLPageLanguageSelect";
import DOLLayout from "../components/templates/DOLLayout";
import DOLBareLayout from "../components/templates/DOLBareLayout";
import DOL404 from "../components/templates/DOL404";

const mapStateToProps = state => {
    return {
        literals: state.literals,
        lang: state.lang
    };
};


class DOLAppRouter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        const { lang } = this.props;
        const Router = ({ match, location }) => (
            <Switch>
                <Route exact path={'/:lang(en|fr)/admin'}>
                    <DOLLayout content={<DOLPageAdminConsole />} />
                </Route>
                <Route exact path={'/:lang(en|fr)/open-registry'}>
                    <DOLBareLayout content={<DOLPageOpenRegistry />} />
                </Route>
                <Route>
                    <DOLLayout content={<DOL404 location={location} />} />
                </Route>
            </Switch>
        )

        const NoLangRoute = ({ match }) => (
            <Switch>
                <Redirect to={'/' + ((lang === 'en' || lang === 'fr') ? lang : 'en') + '/' + match.params.route} />
                <Route component={DOL404} />
            </Switch>
        )

        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' component={DOLPageLanguageSelect} />
                    <Route path='/:lang(en|fr)/:route*' component={Router} />
                    <Route path='/:route*' component={NoLangRoute} />
                    <Route>
                        <DOLLayout content={<DOL404 location={window.location} />} />
                    </Route>
                </Switch>
            </React.Fragment>
        );
    }
}

DOLAppRouter.defaultProps = {
    lang: 'en'
};

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLAppRouter));


