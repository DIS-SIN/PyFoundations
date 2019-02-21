import React, { Component } from "react";
import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LabelIcon from '@material-ui/icons/Label';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import classNames from 'classnames';
import AjaxTest from "../../samples/AjaxTest";
import DOLExperiences from "../organisms/DOLExperiences";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    layout: {
        width: 'auto',
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
});

class DOLPageExploreExperiences extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/home", "title": literals.pages.stub.hero.home },
        ];

        //  {apiDataItem}
        const returnFragment = (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    title={literals.pages.experiences.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.experiences.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <DOLExperiences />
                </div>
            </React.Fragment>
        )
        return returnFragment;

    }
}

DOLPageExploreExperiences.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLPageExploreExperiences));

