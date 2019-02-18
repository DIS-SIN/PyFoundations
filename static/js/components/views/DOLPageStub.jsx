import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";

const styles = theme => ({

});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageStub extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/home", "title": "Home" },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title="DOL Page Stub"
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext"><strong>Route:</strong> {location.pathname}</React.Fragment>}
                    links={link_group_hero}
                />
            </React.Fragment>
        );
    }
}

DOLPageStub.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageStub));