import React, { Component } from "react";

// maybe import higher up?
import Promise from 'promise-polyfill';
import "whatwg-fetch";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


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
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: ""
        };
    }

    // this fires when the component loads
    componentDidMount() {
        fetch("/api/test/learningpoint") // pyfoundations/api/gettest
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        response: result,
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
        // end fetch
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/test/puttest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: this.state.post,
                pyfoundations_ask: this.state.post
            }),
        });
        const body = await response.json();//response.text();
        this.setState({
            responseToPost: body
        });
    }

    render() {
        const { error, isLoaded, learningpoints, post, response, responseToPost } = this.state;
        const { literals } = this.props;
        if (error) {
            return <div>{literals.ajaxtest.error} {error.message}</div>;
        } else if (!isLoaded) {
            return <div>{literals.ajaxtest.loading}...</div>;
        } else {
            // id name description slug tags{id tag datetime} difficulty

            const learningPointReturnFragment = (
                <form className="reqResDetails" onSubmit={this.handleSubmit}>
                    <p>
                        <strong>{literals.ajaxtest.post}:</strong>
                    </p>
                    <input
                        type="text"
                        value={post}
                        onChange={e => this.setState({ post: e.target.value })}
                    />
                    <button type="submit">{literals.form.submit}</button>
                    <div className="requestDetails">
                        <small>{literals.ajaxtest.request}:</small>
                        <pre>{JSON.stringify(post, null, 2)}</pre>
                    </div>
                    <div className="responseToPostDetails">
                        <small>{literals.ajaxtest.response}:</small>
                        <pre>{JSON.stringify(responseToPost, null, 2)}</pre>
                    </div>
                    <div className="responseDetails">
                        <small>{literals.ajaxtest.fetch}:</small>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>

                </form>
            )

            const data = learningpoints.slice(0);

            const learningPointItem = data.map((learningpoint, index) => (
                <div key={index}>
                    <h3>{learningpoint.name}</h3>
                    <p>
                        <small>{learningpoint.description} ({learningpoint.slug})</small>
                    </p>
                    <p>
                        <strong>{learningpoint.difficulty}</strong>
                    </p>
                    <div className="learningPointItem">
                        {learningpoint.tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <small><strong>{tag.tagname}</strong> ({tag.id}@{tag.datetime})</small>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            ))

            const returnFragment = (
                <div className="learningPoint">
                    {learningPointReturnFragment} {learningPointItem}
                </div>
            )
            return returnFragment;
        }
    }
}


export default connect(mapStateToProps)(AjaxTest);