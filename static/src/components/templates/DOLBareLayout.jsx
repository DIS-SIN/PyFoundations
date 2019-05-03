import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollToTop from "../atoms/ScrollToTop";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({

})

class DOLLayout extends React.Component {

    render() {
        const { content } = this.props;
        return (
            <React.Fragment>
                <ScrollToTop />
                <CssBaseline />
                {content}
            </React.Fragment>
        );
    }
}

DOLLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DOLLayout)));

