import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
    },
});
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageStub extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        DOL Page Stub
                    </Typography>
                    <Typography component="p">
                        Route: {location.pathname}
                    </Typography>
                </Paper>
            </React.Fragment>
        );
    }
}

DOLPageStub.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageStub));


