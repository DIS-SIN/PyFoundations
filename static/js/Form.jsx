import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import { TextField, Button, SvgIcon } from "@material-ui/core";

//If your environment doesn't support tree-shaking, the recommended way to import the icons is the following:
import DoneIcon from '@material-ui/icons/Done';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
});

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
        const { literals, classes } = this.props;

        /*
        <TextField style={{ padding: 24 }}
            id="searchInput"
            placeholder="Search for Courses"
            margin="normal"
            onChange={this.onSearchInputChange}
        />
    */
        return (
            <form onSubmit={this.onFormSubmit}>
                <label>{literals.form.fieldname}</label>
                <TextField style={{ padding: 24 }}
                    placeholder="Name"
                    margin="normal"
                    onChange={this.handleChange}
                    type="text"
                    name="fieldName"
                    value={fieldName} />
                <label>{literals.form.fieldvalue}</label>
                <TextField style={{ padding: 24 }}
                    placeholder="Value"
                    margin="normal"
                    onChange={this.handleChange}
                    type="text"
                    name="fieldValue"
                    value={fieldValue} />
                <Button color="primary" type="submit">
                    <DoneIcon />
                    {literals.form.submit}
                </Button>
            </form>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Form);