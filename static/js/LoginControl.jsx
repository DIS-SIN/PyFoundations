import React, { Component } from "react";
import GreetingIntl from "./GreetingIntl";

const LoginButton = (props) => {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

const LogoutButton = (props) => {
  return (
    <button onClick={props.onClick}>
      Logout
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

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <GreetingIntl isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

export default LoginControl;