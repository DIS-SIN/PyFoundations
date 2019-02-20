import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    layout: {
        marginTop: theme.spacing.unit * 8,
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

class DOLPageLanguageSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        open: true
    };

    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/en/home", "title": "English" },
            { "href": "/fr/home", "title": "Français" },
        ];

        return (
            <React.Fragment>
                <CssBaseline />
                <Dialog
                    open={this.state.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        <Grid container spacing={16} justify="center">
                            <Grid item>DIGITAL OPEN LEARNING</Grid>
                            <Grid item>APPRENTISSAGE OUVERT NUMÉRIQUE</Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={16} justify="center">
                            {link_group_hero.map((link, index) => (
                                <Grid key={index} item>
                                    <Button
                                        component={Link}
                                        variant="contained" color="secondary"
                                        to={link.href}>
                                        {link.title}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                </Dialog>

            </React.Fragment>
        );
    }
}

DOLPageLanguageSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageLanguageSelect));
