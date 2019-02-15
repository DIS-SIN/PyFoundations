import React, { Component } from "react"
import Button from '@material-ui/core/Button';
import ToggleOffIcon from '@material-ui/icons/ToggleOff'
import ToggleOnIcon from '@material-ui/icons/ToggleOn'

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };

        // This binding is necessary to make `this` work in the callback
        //this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        const { literals } = this.props;

        let buttonfragement = null;
        if (this.state.isToggleOn) {
            buttonfragement = (
                <React.Fragment>
                    <ToggleOnIcon /> <span>{literals.toggle.on}</span>
                </React.Fragment>
            );
        } else {
            buttonfragement = (
                <React.Fragment>
                    <ToggleOffIcon /> <span>{literals.toggle.off}</span>
                </React.Fragment>
            );
        }

        return (
            <Button
                variant="contained" color="primary"
                onClick={this.handleClick}>
                {buttonfragement}
            </Button>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Toggle);