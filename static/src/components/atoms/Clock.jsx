import React from 'react';
import Chip from '@material-ui/core/Chip';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Typography from "@material-ui/core/Typography";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const ClockHeader = props => {
    return (
        <Typography variant="overline" gutterBottom>
            {props.literals.clock.clockheader}
        </Typography>
    );
}

//<small>{props.date.toLocaleTimeString()}.</small>
const ClockBody = props => {
    return (
        <Chip
            icon={<QueryBuilderIcon />}
            label={props.date.toLocaleTimeString()}
            color="primary"
        />
    );
}

const ClockWidget = props => {
    /*
        clickable
    className={classes.chip}
    
    */
    return (
        <div id="widget__clock">
            {/*<ClockHeader literals={props.literals} />*/}
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
