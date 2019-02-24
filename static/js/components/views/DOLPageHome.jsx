import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { LearningArchitecture } from '../atoms/LearningArchitecture'
import HeroHeader from "../molecules/HeroHeader";
import DOLSignInDialog from "../organisms/DOLSignInDialog";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DOLStreams from "../organisms/DOLStreams";

const styles = theme => ({
    layout: {
        width: '100%',
        marginTop: 0,
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            //marginLeft: 'auto',
            //marginRight: 'auto',
            marginLeft: 0,
            marginRight: 0,
            padding: 0,
        },
        backgroundColor: theme.palette.background.paper,
        //paddingLeft: theme.spacing.unit * 3,
        //paddingRight: theme.spacing.unit * 3,\
        padding: 0,
    },
    cardGrid: {
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        padding: 0,
        //padding: `${theme.spacing.unit * 8}px 0`,
        backgroundColor: theme.palette.background.paper,
        //margin: 0,
        //paddingLeft: theme.spacing.unit * 3,
        //paddingRight: theme.spacing.unit * 3,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
    },
    heroContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
    },
});

const streams = LearningArchitecture().loach_structure.streams;

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const link_group_stream = [
            { "href": "/explore/stream", "title": literals.common.explore },
            { "href": "/profile/add/stream", "title": literals.common.addto + " " + literals.common.profile },
        ];
        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];

        return (
            <React.Fragment>
                <CssBaseline />
                <HeroHeader
                    signin={<Grid key="signindialog" item><DOLSignInDialog /></Grid>}
                    title={literals.pages.home.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.home.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <DOLStreams />
                    </div>
                </div>
                {/*
                <div className={classNames(classes.layout)}>
                    <DOLStreams />
                    
                    <Grid container spacing={40}>
                        {streams.map((item, index) => (
                            <GridInfoCard
                                key={index}
                                title={item.stream}
                                cover={item.cover}
                                text={item.description}
                                links={link_group_stream}
                            />
                        ))}
                        </Grid>
                </div>
                */}
            </React.Fragment>
        );
    }
}

DOLPageHome.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageHome));
