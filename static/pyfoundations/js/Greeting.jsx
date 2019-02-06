import React, { Component } from "react";

const GuestGreeting = (props) => { 
    return (
        <h1>Please sign up.</h1>
    );
}
const UserGreeting = (props) => { 
    return (
        <h1>Welcome back!</h1>
    );
}

class Greeting extends React.Component {
    constructor(props) {
        super(props);
    }    
    render() {
        const { isLoggedIn }  = this.props;
        if (isLoggedIn) {
            return <UserGreeting />;
        }
        return <GuestGreeting />;
    }
}

export default Greeting;