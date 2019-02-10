import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class ApiTest extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            data: []
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=React_%28JavaScript+Library%29&format=json&origin=*";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result
                })
            });
    }

    render() {
        const { data } = this.state;
        const { literals } = this.props;
        const result = data.map((entry, index) => {
            return (
                <li key={index}>{entry}</li>
            );
        });

        return (
            <div className="container__api"><span>{literals.apitest.header}</span><ul>{result}</ul></div>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(ApiTest);