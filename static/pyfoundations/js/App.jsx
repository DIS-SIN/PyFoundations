// App.jsx
import React from "react";
import Table from "./Table";

const HeaderGreeting = () => {
  return (
    <h1> Hello... React!</h1>
  );
}

class App extends React.Component {
  render () {
    const tableContent = [
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
      }
    ];

    return (
      <div className="container">
        <HeaderGreeting />
        <Table 
          tableContentData={tableContent}
        />
      </div>
    );
  }
}

export default App;