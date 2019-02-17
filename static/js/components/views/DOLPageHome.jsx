import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import DOLSignInDialog from "../organisms/DOLSignInDialog";
import { LearningArchitecture } from '../atoms/LearningArchitecture'

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

const cards = LearningArchitecture().loach_structure.streams;


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
        return (
            <React.Fragment>
                <CssBaseline />
                {/* Hero unit */}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Digital Open Learing
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            <HelpOutlineIcon /> <strong>Let's get you started with Digital</strong>. DOL will
                            help <strong>build awareness</strong> of possibilities, <strong>increase confidence</strong> and <strong>capacity</strong> of government employees
                            in their <strong>digital skills</strong>. Explore below to find curated and <strong>personalized learning opportunities</strong>.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <DOLSignInDialog />
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="secondary">
                                        EXPLORE DIGITAL OPEN LEARNING
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {cards.map((item, index) => (
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
