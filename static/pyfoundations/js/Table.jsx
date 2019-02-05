import React, {Component} from "react";

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>FieldName</th>
                <th>FieldValue</th>
                <th>Action</th>
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
                <td><button onClick={() => props.removeDevLang(index)}>Delete</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends Component {
    render() {
        const { tableContentData, removeDevLang } = this.props;

        return(
            <table>
                <TableHeader />
                <TableBody 
                    tableContentData={tableContentData}
                    removeDevLang={removeDevLang}
                />
            </table>
        ); 
    }
}

export default Table;