import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


const TableHeader = props => {
    return (
        <thead>
            <tr>
                <th>{props.literals.table.fieldname}</th>
                <th>{props.literals.table.fieldvalue}</th>
                <th>{props.literals.table.action}</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.tableContentData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.fieldName}</td>
                <td>{row.fieldValue}</td>
                <td><button onClick={() => props.removeTableContent(index)}>Delete</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { literals, tableContentData, removeTableContent } = this.props;

        return (
            <table>
                <TableHeader literals={literals} />
                <TableBody
                    tableContentData={tableContentData}
                    removeTableContent={removeTableContent}
                />
            </table>
        );
    }
}

// connect redux state
export default connect(mapStateToProps)(Table);