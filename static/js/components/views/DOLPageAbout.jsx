import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import GridInfoCard from "../molecules/GridInfoCard";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from "react-redux";

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
    },
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
            padding: "25px 90px",
        },
    },
    bodyContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageAbout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        const link_group_hero = [
            { "href": "/getstarted", "title": literals.pages.about.hero.start },
            { "href": "/tour", "title": literals.pages.about.hero.tour },
        ];
        const link_group_dolcard = [
            { "href": "/explore", "title": literals.pages.about.body.dolcard.explore },
            { "href": "/share", "title": literals.pages.about.body.dolcard.share },
        ];
        const link_group_expectcard = [
            { "href": "/share", "title": literals.pages.about.body.expectcard.participate },
            { "href": "/explore", "title": literals.pages.about.body.expectcard.browse },
        ];
        const link_group_explorecard = [
            { "href": "/explore/streams", "title": literals.pages.about.body.explorecard.streams },
            { "href": "/explore/practices", "title": literals.pages.about.body.explorecard.practices },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                {/*signin={<Grid key="signindialog" item><DOLSignInDialog /></Grid>}*/}
                <HeroHeader

                    title={literals.pages.about.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.about.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                {/*<div className={classNames(classes.layout, classes.cardGrid)}>*/}
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <Grid container spacing={8}>
                            <GridInfoCard
                                title={literals.pages.about.body.dolcard.title}
                                text={literals.pages.about.body.dolcard.text}
                                links={link_group_dolcard}
                            />
                            <GridInfoCard
                                title={literals.pages.about.body.expectcard.title}
                                text={literals.pages.about.body.expectcard.text}
                                links={link_group_expectcard}
                            />
                            <GridInfoCard
                                title={literals.pages.about.body.explorecard.title}
                                text={literals.pages.about.body.explorecard.text}
                                links={link_group_explorecard}
                            />
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageAbout.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageAbout));
