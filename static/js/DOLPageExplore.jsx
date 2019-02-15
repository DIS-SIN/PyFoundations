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
import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SimpleCard from "./SimpleCard";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import DOLSignInDialog from "./DOLSignInDialog";

import { LearningArchitecture } from './LearningArchitecture'

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        //background: `url('/static/images/covers/design.jpg') no-repeat`,
        //backgroundSize: 'cover'
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        color: 'white',
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
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
        paddingTop: 16,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    segment: {
        flexGrow: 1,
        marginBottom: 16,
        marginTop: 16,
    }
});

const streams = LearningArchitecture().loach_structure.streams;
const practices = LearningArchitecture().loach_structure.architecture; // note just design for now

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageExplore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Explore
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            <HelpOutlineIcon /> <strong>Learn what you want</strong>. The catalogue below has <strong>streams</strong> which bundle up groups of <strong>practices</strong>. Each practice
                            has <strong>learning points</strong> which you can explore.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <DOLSignInDialog />
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary">
                                        Your Learner Profile
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <AppBar className={classNames(classes.segment)} position="static" color="default">
                        <Toolbar>
                            <Typography justify="center" variant="h5" component="div">
                                Streams
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={40}>
                        {streams.map((item, index) => (
                            <Grid item key={index} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={item.cover} // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.stream}
                                        </Typography>
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            EXPLORE
                                        </Button>
                                        <Button size="small" color="primary">
                                            ADD TO PROFILE
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <AppBar className={classes.segment} position="static" color="default">
                        <Toolbar>
                            <Typography justify="center" variant="h5" component="div">
                                Practices
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={40}>
                        {practices.map((item, index) => (
                            <Grid item key={index} sm={4} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="http://placeimg.com/640/360/tech"
                                        //"https://loremflickr.com/640/360"//"https://via.placeholder.com/500/f5f5f5"// eslint-disable-line max-len
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.practice}
                                        </Typography>
                                        <Typography>
                                            {item.practice}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            EXPLORE
                                        </Button>
                                        <Button size="small" color="primary">
                                            ADD TO PROFILE
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </div>
            </React.Fragment>
        );
    }
}

DOLPageExplore.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageExplore));

