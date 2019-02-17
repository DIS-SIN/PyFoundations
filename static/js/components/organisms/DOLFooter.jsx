import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        return (
            <React.Fragment>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Grid container spacing={16} justify="center">
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography variant="h6" align="left" gutterBottom>
                                DIGITAL ACADEMY
                        </Typography>
                            <Typography variant="subtitle1" align="left" gutterBottom>
                                The Digital Academy's mission is to provide cutting-edge skills to the Canadian Public Service.
                        </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" align="center" gutterBottom>
                                CONNECT
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">CSPS</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">GCCampus</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">GitHub</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">Message</Button>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" align="center" gutterBottom>
                                SOCIAL MEDIA
                            </Typography>
                            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">GCcollab</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">Twitter</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">LinkedIn</Button>
                                <Button size="small" color="primary" target="_blank" href="https://github.com/DIS-SIN">Medium</Button>
                            </Typography>
                        </Grid>
                    </Grid>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

DOLFooter.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLFooter));


