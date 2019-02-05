// App.jsx
import React from "react";
import Table from "./Table";
import Form from "./Form";

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
    devLangs: [
      /*
      {
        "fieldName": "Javascript",
        "fieldValue":".js"
      },
      {
        "fieldName": "Python",
        "fieldValue":".py"
      },
      {
        "fieldName": "JSX",
        "fieldValue":".jsx"
      },
      {
        "fieldName": "HTML",
        "fieldValue":".html"
      },      
      {
        "fieldName": "SASS",
        "fieldValue":".scss"
      },
      {
        "fieldName": "PowerShell",
        "fieldValue":".ps1"
      } 
      */ 
    ]
  };
  
  removeDevLang = index => {
    const { devLangs } = this.state;
    
    this.setState({
        devLangs: devLangs.filter((devLangs, i) => {
            return i !== index;
        })
    });
  }

  handleSubmit = devLang => {
    this.setState({devLangs: [...this.state.devLangs, devLang]});
  }

  render () {
    const { devLangs } = this.state;

    return (
      <div className="container">
        <HeaderGreeting />
        <HeaderTagLine />
        <Table 
          tableContentData={devLangs}
          removeDevLang={this.removeDevLang}
        />
        <FormHeader />
        <Form 
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;