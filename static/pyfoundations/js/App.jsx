// App.jsx
import React from "react";
import Table from "./Table";
import Form from "./Form";

import Api from "./Api";

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
  state = {
    tableContent: [
      /*
      {
        "fieldName": "Javascript",
        "fieldValue":".js"
      },
      */ 
    ]
  };
  
  removeTableContent = index => {
    const { tableContent } = this.state;
    
    this.setState({
      tableContent: tableContent.filter((tableContent, i) => {
            return i !== index;
        })
    });
  }

  handleSubmit = tableContentItem => {
    this.setState({tableContent: [...this.state.tableContent, tableContentItem]});
  }

  render () {
    const { tableContent } = this.state;

    return (
      <div className="container">
        <HeaderGreeting />
        <HeaderTagLine />
        <Table 
          tableContentData={tableContent}
          removeTableContent={this.removeTableContent}
        />
        <FormHeader />
        <Form 
          handleSubmit={this.handleSubmit}
        />
        <Api />
      </div>
    );
  }
}

export default App;