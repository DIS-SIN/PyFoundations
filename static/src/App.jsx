import React from 'react';
import { HashRouter } from 'react-router-dom'
import { connect } from "react-redux";
import DOLAppRouter from './routers/DOLAppRouter';
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <DOLAppRouter />
      </HashRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
