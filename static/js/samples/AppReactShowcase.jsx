// App.jsx
import React from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import SimpleBottomNav from "./SimpleBottomNav";
import Signup from "./Signup";
import PrimarySearchAppBar from "./PrimarySearchAppBar";

// connect the state from redux
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const styles = theme => ({
  fabButton: {
    position: 'fixed',
    zIndex: 1,
    bottom: 70,
    left: 'auto',
    right: 15,
    margin: '0 auto',
  },
})

class AppReactShowcase extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    tableContent: [ /* { "fieldName": "Javascript", "fieldValue":".js" }, */]
  };


  // Also Correct Syntax, if you want to use state and props together, pass as fxn
  //this.setState((state, props) => ({  
  //  counter: state.counter + props.increment
  //}));
  removeTableContent = index => {
    const { tableContent } = this.state;

    this.setState({
      tableContent: tableContent.filter((tableContent, i) => {
        return i !== index;
      })
    });
  }

  handleSubmit = tableContentItem => {
    this.setState({ tableContent: [...this.state.tableContent, tableContentItem] });
  }


  render() {
    const { tableContent } = this.state;
    const { literals, location, classes } = this.props;

    // note: for local functions you gotta pass around the literals
    // but things you include will use the connect to, well, connect
    return (
      <div>
        <CssBaseline />
        <PrimarySearchAppBar />
        <Signup literals={literals} />
        <SimpleBottomNav />
        <Fab color="primary" aria-label="Add" className={classes.fabButton}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
// redux connect state//
export default connect(mapStateToProps)(withStyles(styles)(AppReactShowcase));
