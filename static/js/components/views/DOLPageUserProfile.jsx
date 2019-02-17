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

import ProgressBarLinear from "../atoms/ProgressBarLinear";

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
