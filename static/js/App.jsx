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

// connect the state from redux
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
    <p>{props.literals.app.headertagline}</p>
  );
}

const FormHeader = props => {
  return (
    <h3>{props.literals.app.formheader}</h3>
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
      <div className="container">
        <IntlComponentA literals={literals} />
        <HeaderGreeting literals={literals} />
        <HeaderTagLine literals={literals} />
        <AppIntl />
        <LoginControl />
        <Clock />
        <Toggle />
        <Toggle />
        <Table
          tableContentData={tableContent}
          removeTableContent={this.removeTableContent}
        />
        <FormHeader literals={literals} />
        <Form
          handleSubmit={this.handleSubmit}
        />
        <AjaxTest />
        <ApiTest />
      </div>
    );
  }
}

// redux connect state//
export default connect(mapStateToProps)(App);
