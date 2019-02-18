import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { LearningArchitecture } from '../atoms/LearningArchitecture'
import GridInfoCard from "../molecules/GridInfoCard";
import HeroHeader from "../molecules/HeroHeader";
import DOLSignInDialog from "../organisms/DOLSignInDialog";

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

const streams = LearningArchitecture().loach_structure.streams;

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const link_group_stream = [
            { "href": "/exmplore/stream", "title": "EXPLORE" },
            { "href": "/profile/add/stream", "title": "ADD TO PROFILE" },
        ];
        const link_group_hero = [
            { "href": "/explore", "title": "EXPLORE" },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    signin={<Grid key="signindialog" item><DOLSignInDialog /></Grid>}
                    title="Digital Open Learing"
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext"><strong>Let's get you started with Digital</strong>. DOL will
                            help <strong>build awareness</strong> of possibilities, <strong>increase confidence</strong> and <strong>capacity</strong> of government employees
                            in their <strong>digital skills</strong>. Explore below to find curated and <strong>personalized learning opportunities</strong></React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {streams.map((item, index) => (
                            <GridInfoCard
                                key={index}
                                title={item.stream}
                                cover={item.cover}
                                text={item.description}
                                links={link_group_stream}
                            />
                        ))}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageHome.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageHome));
