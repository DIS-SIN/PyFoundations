import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const ClockHeader = props => {
    return (
        <small>{props.literals.clock.clockheader}</small>
    );
}

const ClockBody = props => {
    return (
        <small>{props.date.toLocaleTimeString()}.</small>
    );
}

const ClockWidget = props => {
    return (
        <div id="widget__clock">
            <ClockHeader literals={props.literals} />
            <ClockBody date={props.date} />
        </div>
    );
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const { date } = this.state;
        const { literals } = this.props;
        return (
            <ClockWidget literals={literals} date={date} />
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Clock);
