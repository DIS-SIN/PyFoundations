import React, { Component } from 'react';

// redux state connection
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const GuestGreeting = props => (
    <h1>
        {props.literals.greetingintl.guest}
    </h1>
);

const UserGreeting = props => (
    <h1>
        {props.literals.greetingintl.user}
    </h1>
);

class GreetingIntl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isLoggedIn, literals } = this.props;

        let greetingFragment = null;
        if (isLoggedIn) {
            greetingFragment = <UserGreeting literals={literals} />;
        } else {
            greetingFragment = <GuestGreeting literals={literals} />;
        }

        return (
            <div className="greetingBlock">
                {greetingFragment}
            </div>
        )
    }
}

// redux state
export default connect(mapStateToProps)(GreetingIntl);
