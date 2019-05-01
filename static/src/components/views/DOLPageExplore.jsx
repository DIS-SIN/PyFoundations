
// redux state
import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { LearningArchitecture } from '../atoms/LearningArchitecture'
import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser from 'react-html-parser';
import DOLExploreTree from "../organisms/DOLExploreTree";
import GridInfoCard from "../molecules/GridInfoCard";
import HierarchyCrumbs from "../molecules/HierarchyCrumbs";

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
        [theme.breakpoints.up('md')]: {
            padding: "25px 90px",
        },
    },
    bodyContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
        paddingTop: 0,
	}
});

const streams = LearningArchitecture().loach_structure.streams;
const practices = LearningArchitecture().loach_structure.architecture; // note just design for now

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPageExplore extends React.Component {
    
      
    render() {
        const { literals, location, classes } = this.props;
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
                />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
						<HierarchyCrumbs />  
                        <DOLExploreTree />
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

