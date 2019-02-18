import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
// redux state
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import DOLPageStub from "../views/DOLPageStub";
import DOLPageHome from "../views/DOLPageHome";
import DOLPageExplore from "../views/DOLPageExplore";
import DOLPageShare from "../views/DOLPageShare";
import DOLPageSearch from "../views/DOLPageSearch";
import DOLPageAbout from "../views/DOLPageAbout";
import DOLPageLearningStreams from "../views/DOLPageLearningStreams";
import DOLPageUserProfile from "../views/DOLPageUserProfile";

import DOLHeader from "../organisms/DOLHeader";
import DOLFooter from "../organisms/DOLFooter";
import DOLPrimaryActionPanel from "../organisms/DOLPrimaryActionPanel";


const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};



const styles = theme => ({
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
    },
})

class DOLLayout extends React.Component {

    render() {
        const { literals, classes } = this.props;

        return (
            <React.Fragment>
                <DOLHeader />
                {/*<main>*/}
                <Switch>
                    <Route exact path='/' component={DOLPageHome} />
                    <Route exact path='/home' component={DOLPageHome} />
                    <Route exact path='/explore' component={DOLPageExplore} />
                    <Route exact path='/streams' component={DOLPageLearningStreams} />
                    <Route exact path='/share' component={DOLPageShare} />
                    <Route exact path='/about' component={DOLPageAbout} />
                    <Route exact path='/profile' component={DOLPageUserProfile} />
                    <Route exact path='/search' component={DOLPageSearch} />
                    <Route exact path='/logout' component={DOLPageStub} />
                </Switch>
                <DOLPrimaryActionPanel />
                {/*</main>*/}
                <DOLFooter />
            </React.Fragment>
        );
    }
}

DOLLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLLayout));


