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
      {props.literals.title}
    </div>
  )
};

const HeaderGreeting = () => {
  return (
    <h1> Hello... React!</h1>
  );
}

const HeaderTagLine = () => {
  return (
    <p>Basic Table Example in React</p>
  );
}

const FormHeader = () => {
  return (
    <h3>Add Entry to Form</h3>
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
    return (
      <div className="container">
        <IntlComponentA literals={literals} />
        <AppIntl />
        <HeaderGreeting />
        <HeaderTagLine />
        <LoginControl />
        <Clock />
        <Toggle />
        <Toggle />
        <Table
          tableContentData={tableContent}
          removeTableContent={this.removeTableContent}
        />
        <FormHeader />
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
