import React, {Component} from "react";

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>FileType</th>
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
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends Component {
    render() {
        const { tableContentData } = this.props;

        return(
            <table>
                <TableHeader />
                <TableBody 
                    tableContentData={tableContentData}
                />
            </table>
        ); 
    }
}

export default Table;