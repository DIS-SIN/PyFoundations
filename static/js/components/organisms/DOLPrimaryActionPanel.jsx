import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import { connect } from "react-redux";
import Dialog from '@material-ui/core/Dialog';
import ScrollToTop from "../atoms/ScrollToTop";
import DOLAddContentFormContainer from './DOLAddContentFormContainer';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
    },
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class DOLPrimaryActionPanel extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        //console.log("render: ", this.state.stream);
        const { classes, literals } = this.props;

        return (
            <div>
                <ScrollToTop />
                <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} className={classes.fabButton}>
                    <AddIcon />
                </Fab>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <DOLAddContentFormContainer appFixed={true} handleClose={this.handleClose} />

                </Dialog>
            </div >
        );
    }
}

DOLPrimaryActionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(DOLPrimaryActionPanel));
