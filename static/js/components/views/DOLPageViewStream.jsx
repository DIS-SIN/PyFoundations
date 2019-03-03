import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import HeroHeader from "../molecules/HeroHeader";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import DOLEpisodes from "../organisms/DOLEpisodes";
import DOLExperience from "../organisms/DOLExperience";
import DOLPractice from "../organisms/DOLPractice";
import DOLStream from "../organisms/DOLStream";


const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        //maxWidth: 900,
        margin: '0 auto',
        padding: '0',//`${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
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
        const { literals, location, classes, fetchid } = this.props;

        const link_group_hero = [
            { "href": "/explore/streams", "title": literals.common.explore },
        ];
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <DOLStream fetchid={fetchid} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageViewStream.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageViewStream));
