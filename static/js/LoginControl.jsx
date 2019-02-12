import React, { Component } from "react";
import GreetingIntl from "./GreetingIntl";
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import LockIcon from '@material-ui/icons/Lock'

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

/*
    <button onClick={props.onClick}>
      {props.literals.logincontrol.login}
    </button>

    */
const LoginButton = props => {
  return (
    <Button variant="contained" color="primary" onClick={props.onClick}>
      <LockIcon /> {props.literals.logincontrol.login}
    </Button>
  );
}

const LogoutButton = props => {
  return (
    <Button variant="contained" color="primary" onClick={props.onClick}>
      <ExitToAppIcon /> {props.literals.logincontrol.logout}
    </Button>
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