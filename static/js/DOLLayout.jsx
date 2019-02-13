import React, { Component } from "react";
import PropTypes from 'prop-types';

// redux state
import { connect } from "react-redux";
import DOLHeader from "./DOLHeader";
import DOLFooter from "./DOLFooter";
import DOLPageAbout from "./DOLPageAbout";
import DOLPageHome from "./DOLPageHome";
import { Switch, Route } from 'react-router-dom'
import DOLPageStub from "./DOLPageStub";
import { withStyles } from '@material-ui/core/styles';
import FullScreenDialogExample from "./FullScreenDialogExample";


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
                    <Route exact path='/' component={DOLPageStub} />
                    <Route exact path='/home' component={DOLPageHome} />
                    <Route exact path='/explore' component={DOLPageStub} />
                    <Route exact path='/share' component={DOLPageStub} />
                    <Route exact path='/about' component={DOLPageAbout} />
                    <Route exact path='/profile' component={DOLPageStub} />
                    <Route exact path='/logout' component={DOLPageStub} />
                </Switch>
                <FullScreenDialogExample />
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


