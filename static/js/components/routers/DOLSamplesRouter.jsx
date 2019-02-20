import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import AppReactShowcase from '../../samples/AppReactShowcase';
import DashboardExample from '../../samples/DashboardExample';
import AlbumExample from '../../samples/AlbumExample';
import SignupExample from '../../samples/SignupExample';
import PricingExample from '../../samples/PricingExample';
import DOL404 from "../templates/DOL404";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLSamplesRouter extends React.Component {

    render() {
        const { literals, classes, match } = this.props;
        const SampleSelect = ({ match }) => (
            <Switch>
                {console.log('SampleSelect: ' + match.url)}
                <Route exact path={'/:sampledir/dashboard'} component={DashboardExample} />
                <Route exact path={'/:sampledir/showcase'} component={AppReactShowcase} />
                <Route exact path={'/:sampledir/album'} component={AlbumExample} />
                <Route exact path={'/:sampledir/signin'} component={SignupExample} />
                <Route exact path={'/:sampledir/pricing'} component={PricingExample} />
                <Route component={DOL404} />
            </Switch>
        )

        return (
            <React.Fragment>
                <Switch>
                    {console.log('DOLSamplesRouter: ' + match.path + "|" + match.url)}
                    <Route path='/samples/:route*' component={SampleSelect} />
                </Switch>
            </React.Fragment>
        );
    }
}

// connect redux state
export default withRouter(connect(mapStateToProps)(DOLSamplesRouter));


