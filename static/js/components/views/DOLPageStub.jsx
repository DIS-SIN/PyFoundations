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
                    title="404"
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        <strong>{location.pathname}</strong>
                        <h5>We couldn't find that Web page</h5>
                        <p>We're sorry you ended up here. Sometimes a page gets moved or deleted, but hopefully we can help you find what you're looking for. What next?</p>
                        <h5>Nous ne pouvons trouver cette page Web</h5>
                        <p>Nous sommes désolés que vous ayez abouti ici. Il arrive parfois qu'une page ait été déplacée ou supprimée. Heureusement, nous pouvons vous aider à trouver ce que vous cherchez. Que faire?</p>
                    </React.Fragment>}
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
