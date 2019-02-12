import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import { TextField, Button, SvgIcon } from "@material-ui/core";

//If your environment doesn't support tree-shaking, the recommended way to import the icons is the following:
import DoneIcon from '@material-ui/icons/Done';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
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


    */
        return (
            <form onSubmit={this.onFormSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="component-helper-name">{literals.form.fieldname}</InputLabel>
                    <Input
                        id="component-helper-name"
                        name="fieldName"
                        value={fieldName}
                        onChange={this.handleChange}
                        aria-describedby="component-helper-name-text"
                    />
                    <FormHelperText id="component-helper-name-text">First col for test</FormHelperText>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="component-helper-value">{literals.form.fieldvalue}</InputLabel>
                    <Input
                        id="component-helper-value"
                        name="fieldValue"
                        value={fieldValue}
                        onChange={this.handleChange}
                        aria-describedby="component-helper-value-text"
                    />
                    <FormHelperText id="component-helper-value-text">Second col for test</FormHelperText>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                    <DoneIcon />
                    {literals.form.submit}
                </Button>
            </form>
        );
    }
}

// connect redux state
//export default connect(mapStateToProps)(Form);

Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Form));