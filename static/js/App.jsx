import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import AppReactDOL from './AppReactDOL';
import AppReactShowcase from './AppReactShowcase';

// connect the state from redux
import { connect } from "react-redux";
import Layout from './Layout';
import DOLLayout from './DOLLayout';
import DashboardExample from './DashboardExample';
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

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
      <Layout>
        <Switch>
          <Route exact path='/' component={DOLLayout} />
          <Route exact path='/home' component={DOLLayout} />
          <Route exact path='/explore' component={DOLLayout} />
          <Route exact path='/share' component={DOLLayout} />
          <Route exact path='/about' component={DOLLayout} />
          <Route exact path='/profile' component={DOLLayout} />
          <Route exact path='/logout' component={DOLLayout} />
          <Route exact path='/dashboard' component={DashboardExample} />
          <Route exact path='/showcase' component={AppReactShowcase} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
