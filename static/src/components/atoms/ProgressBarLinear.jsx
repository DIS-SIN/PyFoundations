import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class ProgressBarLinear extends React.Component {
    render() {
        const { classes, completed } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate" value={completed} />
            </div>
        );
    }
}

ProgressBarLinear.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressBarLinear);