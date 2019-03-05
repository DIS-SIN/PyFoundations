import React, { Component } from "react";

// redux state
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactMarkdown from "react-markdown"
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import DOLSignInDialog from "../organisms/DOLSignInDialog";
import { LearningArchitecture } from '../atoms/LearningArchitecture'
import HeroHeader from "../molecules/HeroHeader";
import DOLStreams from "../organisms/DOLStreams";
import DOLPractices from "../organisms/DOLPractices";
import DOLExperiences from "../organisms/DOLExperiences";
import DOLEpisodes from "../organisms/DOLEpisodes";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DOLExploreTree from "../organisms/DOLExploreTree";
import GridInfoCard from "../molecules/GridInfoCard";

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
        //background: `url('/static/images/covers/design.jpg') no-repeat`,
        //backgroundSize: 'cover'
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        color: 'white',
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    segment: {
        flexGrow: 1,
        marginBottom: 16,
        marginTop: 16,
    },
    bodyUnit: {
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing.unit * 2}px`,
    },
    bodyContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
    },
});

const streams = LearningArchitecture().loach_structure.streams;
const practices = LearningArchitecture().loach_structure.architecture; // note just design for now

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageExplore extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;
        const link_group_hero = [
            //{ "href": "/profile", "title": literals.common.learnerprofile },
            { "href": "/explore/experiences", "title": literals.common.experiences },
            { "href": "/explore/episodes", "title": literals.common.episodes },
            { "href": "/explore/streams", "title": literals.common.streams },
            { "href": "/explore/practices", "title": literals.common.practices },
        ];
        const link_group_selector = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                {/*signin={<Grid key="signindialog" item><DOLSignInDialog /></Grid>}*/}
                <HeroHeader
                    title={literals.pages.explore.hero.title}
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        {ReactHtmlParser(literals.pages.explore.hero.text)}
                    </React.Fragment>}
                    links={link_group_hero}
                />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>

                        <DOLExploreTree />
                        <Grid spacing={8} container>
                            <GridInfoCard
                                key="streamSelect"
                                title={literals.common.streams}
                                cover="https://placeimg.com/640/480/any"
                                text={ReactHtmlParser(literals.pages.streams.hero.text)}
                                links={link_group_selector}
                                xs={12} sm={6} md={3}
                                fetchid="streams"
                            />
                            <GridInfoCard
                                key="practiceSelect"
                                title={literals.common.practices}
                                cover="https://placeimg.com/640/480/animals"
                                text={ReactHtmlParser(literals.pages.practices.hero.text)}
                                links={link_group_selector}
                                xs={12} sm={6} md={3}
                                fetchid="practices"
                            />
                            <GridInfoCard
                                key="experienceSelect"
                                title={literals.common.experiences}
                                cover="https://placeimg.com/640/480/nature"
                                text={ReactHtmlParser(literals.pages.experiences.hero.text)}
                                links={link_group_selector}
                                xs={12} sm={6} md={3}
                                fetchid="experiences"
                            />
                            <GridInfoCard
                                key="episodeSelect"
                                title={literals.common.episodes}
                                cover="https://placeimg.com/640/480/tech"
                                text={ReactHtmlParser(literals.pages.episodes.hero.text)}
                                links={link_group_selector}
                                xs={12} sm={6} md={3}
                                fetchid="episodes"
                            />
                        </Grid>


                        {/** 
                        <DOLEpisodes />
                        <DOLStreams />
                        <DOLPractices />
                        <DOLExperiences />
                        */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageExplore.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageExplore));

