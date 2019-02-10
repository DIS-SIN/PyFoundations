import React, { Component } from "react"

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
            buttonfragement = <span>{literals.toggle.on}</span>;
        } else {
            buttonfragement = <span>{literals.toggle.off}</span>;
        }

        return (
            <button onClick={this.handleClick}>
                {buttonfragement}
            </button>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Toggle);