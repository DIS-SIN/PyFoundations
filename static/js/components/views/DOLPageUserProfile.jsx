import React, { Component } from "react";
// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import ProgressBarLinear from "../atoms/ProgressBarLinear";
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Link } from 'react-router-dom';

const styles = theme => ({
    layout: {
        width: 'auto',
        //marginLeft: theme.spacing.unit * 3,
        //marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    avatar: {
        margin: 'auto',
        width: 160,
        height: 160,
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageUserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        const progressMain = 80;

        const link_group_hero = [
            { "href": "/profile/update", "title": literals.pages.profile.hero.setgoals },
            { "href": "/profile/update", "title": literals.pages.profile.hero.updateprofile },
        ];

        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.profile.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.profile.hero.text)}
                        <ProgressBarLinear completed={progressMain} />
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout)}>
                    <Grid container spacing={16} >
                        <Grid item xs={12} sm={4}>
                            <Avatar alt="Avatar" src="https://via.placeholder.com/500/333333" className={classes.avatar} >
                                EW
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm={8}>

                            <Grid container spacing={16} alignItems="center">
                                <Grid item>
                                    <Typography component="h1" variant="h4">
                                        Elle Weasela
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <div className={classes.settings}>
                                        <Button component={Link} to="/profile/edit" className={classes.editButton} variant="outlined" >
                                            {literals.pages.profile.editprofile}
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={40}>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>4</b> {literals.common.streams}
                                    </Typography>
                                    <ProgressBarLinear completed={progressMain} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>22</b> {literals.common.practices}
                                    </Typography>
                                    <ProgressBarLinear completed={progressMain} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>260</b> {literals.common.experiences}
                                    </Typography>
                                    <ProgressBarLinear completed={progressMain} />
                                </Grid>
                            </Grid>

                            <Grid container spacing={40}>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        learner@email.com
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">CSPS, DIS/DAT</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Ottawa, ON</Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={32}>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <img
                                    alt="post"
                                    style={{ width: '100%' }}
                                    src="https://via.placeholder.com/500/f5f5f5"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageUserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageUserProfile));
