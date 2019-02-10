import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            fieldName: "",
            fieldValue: ""
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { fieldName, fieldValue } = this.state;
        const { literals } = this.props;
        return (
            <form onSubmit={this.onFormSubmit}>
                <label>{literals.form.fieldname}</label>
                <input
                    type="text"
                    name="fieldName"
                    value={fieldName}
                    onChange={this.handleChange} />
                <label>{literals.form.fieldvalue}</label>
                <input
                    type="text"
                    name="fieldValue"
                    value={fieldValue}
                    onChange={this.handleChange} />
                <button type="submit">
                    {literals.form.submit}
                </button>
            </form>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Form);