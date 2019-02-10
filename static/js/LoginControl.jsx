import React, { Component } from "react";
import GreetingIntl from "./GreetingIntl";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const LoginButton = props => {
  return (
    <button onClick={props.onClick}>
      {props.literals.logincontrol.login}
    </button>
  );
}

const LogoutButton = props => {
  return (
    <button onClick={props.onClick}>
      {props.literals.logincontrol.logout}
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    const { literals } = this.props;
    if (isLoggedIn) {
      button = <LogoutButton literals={literals} onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton literals={literals} onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <GreetingIntl isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

// connect redux state
export default connect(mapStateToProps)(LoginControl);