import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        backgroundImage: `url('/static/images/sp-bg-12.jpg')`,
        backgroundSize: 'cover',
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingRight: 0,
        paddingLeft: 0,
        color: 'white',
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
        marginLeft: 0,
        marginRight: 0,
    },
    highContrast: {
        color: 'white',
    },
    fadeBacker: {
        backgroundColor: `rgba(0,0,0,0.2)`,
        padding: `${theme.spacing.unit * 2}px`,
    }
});


class HeroHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, links, icon, text, signin, classes } = this.props;

        const linksFragment = this.props.links.map((link, index) => (
            <Grid key={index} item xs={12} sm={6}>
                <Button
                    fullWidth
                    component={Link}
                    variant="contained" color="secondary"
                    to={link.href}>
                    {link.title}
                </Button>
            </Grid>
        ));

        return (
            <React.Fragment>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" align="center" color="inherit" component="div" className={classes.fadeBacker}>
                            {icon} {text}
                        </Typography>
                        {/*<div className={classes.heroButtons}>*/}
                        <Grid container spacing={0} justify="center">
                            <Grid container spacing={8} justify="center" className={classes.heroButtons}>
                                {/*<Grid container spacing={8} justify="center">*/}
                                {signin ? (
                                    <React.Fragment>
                                        <Grid item xs={12} sm={6}>
                                            {signin}
                                        </Grid>
                                        {linksFragment}
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            {linksFragment}
                                        </React.Fragment>

                                    )}
                            </Grid>
                        </Grid>
                        {/*</div>*/}
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

