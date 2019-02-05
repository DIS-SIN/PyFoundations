// App.jsx
import React from "react";
import Table from "./Table";

const HeaderGreeting = () => {
  return (
    <h1> Hello... React!</h1>
  );
}


class App extends React.Component {
  state = {
    devLangs: [
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

  render () {
    const { devLangs } = this.state;

    return (
      <div className="container">
        <HeaderGreeting />
        <Table 
          tableContentData={devLangs}
          removeDevLang={this.removeDevLang}
        />
      </div>
    );
  }
}

export default App;