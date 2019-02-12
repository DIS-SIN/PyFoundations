import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography'

// redux state connection
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const GuestGreeting = props => (
    <Typography variant="h5" gutterBottom>
        {props.literals.greetingintl.guest}
    </Typography>
);

const UserGreeting = props => (
    <Typography variant="h5" gutterBottom>
        {props.literals.greetingintl.user}
    </Typography>
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
