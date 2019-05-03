import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '../molecules/Snackbar'
import DOLOpenRegsitryFormContainer from '../organisms/DOLOpenRegsitryFormContainer'
const styles = theme => ({
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
            padding: "25px 90px",
        },
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals,
        notice: state.notice
    };
};

class DOLPageOpenRegistry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { classes, notice } = this.props
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <Snackbar notice={notice} />
                        <DOLOpenRegsitryFormContainer />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageOpenRegistry.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageOpenRegistry))