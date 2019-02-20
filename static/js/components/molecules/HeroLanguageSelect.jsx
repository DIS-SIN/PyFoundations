import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        background: `url('/static/images/sp-bg-12.jpg')`, //center center no-repeat fixed cover
        margin: 0,
        padding: 0,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        color: '#ffffff',
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
});


class HeroHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, links, icon, text, classes } = this.props;

        const linksFragment = this.props.links.map((link, index) => (
            <Grid key={index} item>
                <Button
                    component={Link}
                    variant="contained" color="secondary"
                    to={link.href}>
                    {link.title}
                </Button>
            </Grid>
        ));

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" component="div">
                            {icon} {text}
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                {linksFragment}
                            </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

HeroHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default withStyles(styles)(HeroHeader);

