import React, {Component} from "react";

const ClockHeader = () => {
    return (
        <small>Clock: </small>
    );
}

const ClockBody = (props) => { 
    return (
        <small>{props.date.toLocaleTimeString()}.</small>
    );
}

const ClockWidget = (props) => {
    return (
        <div id="widget__clock">
            <ClockHeader />
            <ClockBody date={props.date}/>
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

        return(
            <ClockWidget date={date}/>
        ); 
    }
}

export default Clock;