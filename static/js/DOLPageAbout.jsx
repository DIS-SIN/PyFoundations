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

import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

/*
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
    },
}); */
const styles = theme => ({
    appBar: {
        position: 'relative',
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
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


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
        return (
            <React.Fragment>
                <CssBaseline />
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            About
                    </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            <HelpOutlineIcon /> <strong>Digtal Open Learning is an idea.</strong> To make sense of <strong>Digital in a Human way</strong>.
                            Digital transformation isn't about technology alone. It's cultural and human.
                            Let's <strong>build awareness</strong> of possibilities, <strong>increase confidence</strong> and <strong>capacity</strong> of government employees
                            together. Explore below to find curated and <strong>personalized learning opportunities</strong>.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Get Started!
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Give me the tour
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={40}>
                        {
                            /*
                        <Grid item sm={6} md={4} lg={3}>
                            <SimpleCard descriptor="Digital Academy" title="Digtal Open Learning" secondary="What is this anyway?" bodytext="DOL presents the digital transformation of the Canadian government and its services in human terms because digital transformation is fundamentally cultural. The focus of the foundational learning offerings are designed to build awareness of possibilities, increase confidence and capacity of government employees who are navigating the impacts of digital on their world. Additionally, digital foundations piques the interest to learn more through curated and personalized learning opportunities." />
                        </Grid>
                        <Grid item sm={6} md={4} lg={3}>
                            <SimpleCard descriptor="What to Expect" title="Outcomes" secondary="How will I benefit?" bodytext={listfragment} />
                        </Grid>
                        */}
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Digtal Open Learning
                                    </Typography>
                                    <Typography component="div">
                                        DOL presents the digital transformation of the Canadian government and its services in human terms because digital transformation is fundamentally cultural. The focus of the foundational learning offerings are designed to build awareness of possibilities, increase confidence and capacity of government employees who are navigating the impacts of digital on their world. Additionally, digital foundations piques the interest to learn more through curated and personalized learning opportunities.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        EXPLORE Learning Architecture
                                    </Button>
                                    <Button size="small" color="primary">
                                        SHARE Knowledge
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        What to Expect
                                    </Typography>
                                    <Typography component="div">
                                        {listfragment}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        PARTICIPATE
                                    </Button>
                                    <Button size="small" color="primary">
                                        JUST BROWSE
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>


                        {/** 
                        {cards.map(card => (
                            <Grid item key={card} sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                            </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the content.
                                            </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                            </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                            </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        */}
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
