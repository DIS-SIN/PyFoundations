import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class HeaderLogoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { href, text } = this.props;

        return (
            <React.Fragment>
                <Button color="inherit" component={Link} to={href}>
                    {text}
                </Button>
            </React.Fragment>
        );
    }
}

export default HeaderLogoItem;
