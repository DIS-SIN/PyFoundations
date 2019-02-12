import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

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
            <React.Fragment>
                <Typography component="div" variant="h6">
                    {literals.apitest.header}
                </Typography>
                <Typography component="ul">
                    {result}
                </Typography>
            </React.Fragment>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(ApiTest);