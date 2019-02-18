import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import GridInfoCard from "../molecules/GridInfoCard";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageAbout extends React.Component {
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
        const link_group_hero = [
            { "href": "/getstarted", "title": "Get Started" },
            { "href": "/tour", "title": "Give me the tour" },
        ];
        const link_group_dolcard = [
            { "href": "/explore", "title": "EXPLORE Digital Open Learning" },
            { "href": "/share", "title": "SHARE Knowledge" },
        ];
        const link_group_expectcard = [
            { "href": "/share", "title": "PARTICIPATE" },
            { "href": "/explore", "title": "BROWSE" },
        ];
        const link_group_explorecard = [
            { "href": "/streams", "title": "STREAMS" },
            { "href": "/practices", "title": "PRACTICES" },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title="About"
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext"><strong>Digtal Open Learning is an idea.</strong> To make sense of <strong>Digital in a Human way</strong>.
                            Digital transformation isn't about technology alone. It's cultural and human.
                            Let's <strong>build awareness</strong> of possibilities, <strong>increase confidence</strong> and <strong>capacity</strong> of government employees
                            together.Explore below to find curated and <strong>personalized learning opportunities</strong></React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        <GridInfoCard
                            title="Digital Open Learning"
                            text="DOL presents the digital transformation of the Canadian government and its services in human terms because digital transformation is fundamentally cultural. The focus of the foundational learning offerings are designed to build awareness of possibilities, increase confidence and capacity of government employees who are navigating the impacts of digital on their world. Additionally, digital foundations piques the interest to learn more through curated and personalized learning opportunities."
                            links={link_group_dolcard}
                        />
                        <GridInfoCard
                            title="What to Expect"
                            text={listfragment}
                            links={link_group_expectcard}
                        />
                        <GridInfoCard
                            title="Explore DOL"
                            text="DOL has a curated catalogue of Digital Learning Resources. Explore them furhter by Stream, Practice, and more. When you find something you want to know more about, add it to your profile so you can track your learning."
                            links={link_group_explorecard}
                        />
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageAbout.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageAbout));
