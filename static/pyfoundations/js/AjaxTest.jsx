import React, { Component } from "react";
import Promise from 'promise-polyfill';
import "whatwg-fetch";

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

class AjaxTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("/pyfoundations/api/test/learningpoint") // pyfoundations/api/gettest
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        learningpoints: result.learningpoints
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    /*

            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} {item.description} {item.slug} {item.difficulty} 
                        </li>
                    ))}
                </ul>
            );
    */ 
    render() {
        const { error, isLoaded, learningpoints } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // id name description slug tags{id tag datetime} difficulty

            const data = learningpoints.slice(0);
            const learningPointItem = data.map((learningpoint, index) => (
                <div key={index}>
                    Guts: 
                    {learningpoint.name} 
                    {learningpoint.description} 
                    {learningpoint.slug} 
                    {learningpoint.difficulty}  
                    <br />
                    <div className="learningPointItem">
                        <ul>
                            {learningpoint.tags.map((tag, index) => (
                                <React.Fragment key={index}>
                                    <li>
                                        LPID: {tag.id}
                                    </li>
                                    <li>
                                        Name: {tag.tagname}
                                    </li>
                                    <li>
                                        Time: {tag.datetime}
                                    </li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            ))
            return learningPointItem;
        }
    }
}

/*
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/puttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>{this.state.response}</p>
                <p>
                    <strong>Post to Server:</strong>
                </p>
                <input
                    type="text"
                    value={this.state.post}
                    onChange={e => this.setState({ post: e.target.value })}
                />
                <button type="submit">Submit</button>
                <p>{this.state.responseToPost}</p>
            </form>
        );
    }
*/

export default AjaxTest;