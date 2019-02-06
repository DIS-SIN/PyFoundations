import React, { Component } from "react";

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            fieldName: "",
            fieldValue: ""
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const {name, value} = event.target;
    
        this.setState({
            [name] : value
        });
    }   
    
    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { fieldName, fieldValue } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label>FieldName</label>
                <input 
                    type="text" 
                    name="fieldName" 
                    value={fieldName} 
                    onChange={this.handleChange} />
                <label>FieldValue</label>
                <input 
                    type="text" 
                    name="fieldValue" 
                    value={fieldValue} 
                    onChange={this.handleChange}/>
                <button type="submit">
                    Submit
                </button>
            </form>            
        );
    }
}

export default Form;