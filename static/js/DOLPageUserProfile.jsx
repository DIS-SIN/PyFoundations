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
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import ProgressBarLinear from "./ProgressBarLinear";

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
        return (
            <React.Fragment>
                <CssBaseline />
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Profile
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" component="div">
                            Let's <strong>track how far</strong> you've come and <strong>what you now</strong> know!
                            <ProgressBarLinear completed={progressMain} />
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        SET GOALS!
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        UPDATE LEARNER PROFILE
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout)}>
                    {/*<Header />*/}

                    <Grid container spacing={16} >
                        <Grid item xs={12} sm={4}>
                            <Avatar alt="Learner Avatar" src="https://via.placeholder.com/500/333333" className={classes.avatar} >
                                LN
                            </Avatar>
                            {/*<Avatar
                                    ultraLarge={upSm}
                                    medium={!upSm}
                                    style={{ margin: 'auto' }}
                                    src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg"
                                />*/}
                        </Grid>
                        <Grid item xs={12} sm={8}>

                            <Grid container spacing={16} alignItems="center">
                                <Grid item>
                                    <Typography component="h1" variant="h4">
                                        Learner Name
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <div className={classes.settings}>
                                        <Button className={classes.editButton} variant="outlined" >
                                            Edit Profile
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={40}>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>4</b> Streams
                                    </Typography>
                                    <ProgressBarLinear completed={progressMain} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>22</b> Practices
                                    </Typography>
                                    <ProgressBarLinear completed={progressMain} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>260</b> Experiences
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
                                    <Typography variant="subtitle1">Department, Team</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">Location, Information</Typography>
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

