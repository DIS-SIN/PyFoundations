import React from 'react';
import { Switch, Route, HashRouter, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLAppRouter from './components/routers/DOLAppRouter';
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const elem = document.getElementById("initloader");
    elem.parentNode.removeChild(elem);
  }

  render() {
    return (
      <HashRouter>
        <DOLAppRouter />
      </HashRouter >
    );
  }
}

export default connect(mapStateToProps)(App);
