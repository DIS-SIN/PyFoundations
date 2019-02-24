import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


const styles = theme => ({

});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageViewStream extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/home", "title": literals.pages.stub.hero.home },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.stub.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        <div>
                            <strong>{literals.pages.stub.hero.route}</strong> {location.pathname}
                        </div>
                        <div>
                            {ReactHtmlParser(literals.pages.stub.hero.text)}
                        </div>
                    </React.Fragment>}
                    links={link_group_hero}
                />
            </React.Fragment>
        );
    }
}

DOLPageViewStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageViewStream));
