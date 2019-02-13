/**
 * Digital Academy Foundations
Foundations presents the digital transformation of the Canadian government and its services in human terms because digital transformation is fundamentally cultural. The focus of the foundational learning offerings are designed to build awareness of possibilities, increase confidence and capacity of government employees who are navigating the impacts of digital on their world. Additionally, digital foundations piques the interest to learn more through curated and personalized learning opportunities.

Outcomes:
Public servants (learners) engage in new ways of thinking about themselves, their work and the role of government in providing better services to citizens;
Learners improve their knowledge and skills through easy to consume, timely and relevant content related to digital in government
Learners improve their understanding of digital through connections to deeper learning activities
 */
import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SimpleCard from "./SimpleCard";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
    },
});
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageStub extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        const listfragment = (
            <ul>
                <li>Public servants (learners) engage in new ways of thinking about themselves, their work and the role of government in providing better services to citizens;</li>
                <li>Learners improve their knowledge and skills through easy to consume, timely and relevant content related to digital in government</li>
                <li>Learners improve their understanding of digital through connections to deeper learning activities</li>
            </ul>
        );
        return (
            <React.Fragment>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h4" component="h3">
                        <HelpOutlineIcon /> About
                    </Typography>
                    <SimpleCard descriptor="Digital Academy" title="Digtal Open Learning" secondary="What is this anyway?" bodytext="DOL presents the digital transformation of the Canadian government and its services in human terms because digital transformation is fundamentally cultural. The focus of the foundational learning offerings are designed to build awareness of possibilities, increase confidence and capacity of government employees who are navigating the impacts of digital on their world. Additionally, digital foundations piques the interest to learn more through curated and personalized learning opportunities." />
                    <SimpleCard descriptor="What to Expect" title="Outcomes" secondary="How will I benefit?" bodytext={listfragment} />
                    <Typography component="p">
                        Route: {location.pathname}
                    </Typography>
                </Paper>
            </React.Fragment>
        );
    }
}

DOLPageStub.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageStub));


