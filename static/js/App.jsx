import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

// connect the state from redux
import { connect } from "react-redux";
import Layout from './components/atoms/Layout';
import DOLLayout from './components/templates/DOLLayout';

import AppReactShowcase from './samples/AppReactShowcase';
import DashboardExample from './samples/DashboardExample';
import AlbumExample from './samples/AlbumExample';
import SignupExample from './samples/SignupExample';
import PricingExample from './samples/PricingExample';
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
          {/* Example Routes to Show Material UI Templates*/}
          <Route exact path='/dashboard' component={DashboardExample} />
          <Route exact path='/showcase' component={AppReactShowcase} />
          <Route exact path='/album' component={AlbumExample} />
          <Route exact path='/signin' component={SignupExample} />
          <Route exact path='/pricing' component={PricingExample} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
