// App.jsx
import React from "react";
import Table from "./Table";
import Form from "./Form";
import Clock from "./Clock";
import Toggle from "./Toggle";
import LoginControl from "./LoginControl";
import AjaxTest from "./AjaxTest";
import ApiTest from "./ApiTest";
import AppIntl from "./AppIntl";
// material-ui
import NavBar from "./NavBar";
import MUIButton from "./MUIButton";
import { Typography } from "@material-ui/core";

import Paper from '@material-ui/core/Paper';
// MDC Libs
//import MDCTest from "./MDCTest";
//import MDCCard from "./MDCCard";
//<MDCTest />
//<MDCCard />

//import CssBaseline from '@material-ui/core/CssBaseline';

// connect the state from redux
import PaperSheet from "./PaperSheet";
import GuttersGrid from "./GuttersGrid";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SimpleBottomNav from "./SimpleBottomNav";
import Signup from "./Signup";


import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const IntlComponentA = props => {
  return (
    <div>
      {props.literals.app.title}
    </div>
  )
};

const HeaderGreeting = props => {
  return (
    <h1>{props.literals.app.headergreeting}</h1>
  );
}

const HeaderTagLine = props => {
  return (
    <Typography component="p">
      {props.literals.app.headertagline}
    </Typography>
  );
}

const FormHeader = props => {
  return (
    <Typography component="h3" variant="h3" gutterBottom>
      {props.literals.app.formheader}
    </Typography>
  );
}

class App extends React.Component {
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
    const { literals } = this.props;
    //console.log(this.props.literals.title)
    //console.log(literals);

    // note: for local functions you gotta pass around the literals
    // but things you include will use the connect to, well, connect
    return (
      <div>
        <PrimarySearchAppBar />
        <Signup literals={literals} />
      </div>
    );
  }
}
/*

<PrimarySearchAppBar />
        <GuttersGrid />
        <SimpleBottomNav />

<NavBar />
        <FormHeader literals={literals} />
        <Form
          handleSubmit={this.handleSubmit}
        />
        <Table
          tableContentData={tableContent}
          removeTableContent={this.removeTableContent}
        />

        <IntlComponentA literals={literals} />
        <HeaderGreeting literals={literals} />
        <HeaderTagLine literals={literals} />
        <AppIntl />
        <LoginControl />

        <MUIButton />

        <Clock />
        <Toggle />
        <Toggle />
        <AjaxTest />
        <ApiTest />

*/

// redux connect state//
export default connect(mapStateToProps)(App);
