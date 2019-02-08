import React, { Component } from "react";

class ApiTest extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=React_%28JavaScript+Library%29&format=json&origin=*";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    data: result
                })
            })
        ;
    }

    render() {
        const { data } = this.state;

        const result = data.map((entry,index) => {
            return (
                <li key={index}>{entry}</li>
            );
        });

        return (
            <div className="container__api"><ul>{result}</ul></div>
        );
    }
}

export default ApiTest;