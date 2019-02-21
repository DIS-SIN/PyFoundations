import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DOLEpisodes from "../organisms/DOLEpisodes";


const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageExploreEpisodes extends React.Component {
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
                    title={literals.pages.episodes.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.episodes.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <DOLEpisodes />
                </div>
            </React.Fragment>
        );
    }
}

DOLPageExploreEpisodes.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageExploreEpisodes));
