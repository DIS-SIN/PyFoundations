import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import DOLPractices from "../organisms/DOLPractices";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

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
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageLearningPractices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.practices.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.practices.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <DOLPractices />
                </div>
            </React.Fragment >
        );
    }
}

DOLPageLearningPractices.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageLearningPractices));
