import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import HierarchyCrumbs from "../molecules/HierarchyCrumbs";
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
        backgroundColor: theme.palette.background.paper,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
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

class DOLPageExplorePractices extends React.Component {
    

    render() {
        const { literals, location, classes } = this.props;
        const uri = window.location.href.replace('#','');
        const url = new URL(uri);
        const streamId = url.searchParams.get("streamId");
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
                />
                <div className={classes.bodyUnit}>
                    <div className={classes.bodyContent}>
                        <HierarchyCrumbs />
                        <DOLPractices streamId={streamId} />
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

DOLPageExplorePractices.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageExplorePractices));
