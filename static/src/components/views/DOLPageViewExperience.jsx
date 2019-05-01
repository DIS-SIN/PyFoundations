import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { withStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import DOLExperience from "../organisms/DOLExperience";


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

class DOLPageViewExperience extends React.Component {
    

    render() {
        const { literals, classes, fetchid } = this.props;

        // const link_group_hero = [
        //     { "href": "/explore/experiences", "title": literals.common.explore + " " + literals.common.experience },
        // ];
        return (
            <React.Fragment>
                <CssBaseline />
                {/*<HeroHeader
                    title="View Episode"
                    icon={<HelpOutlineIcon />}
                    text={<React.Fragment key="herotext">
                        <div>
                            <strong>{literals.pages.stub.hero.route}</strong> {location.pathname}
                        </div>

                    </React.Fragment>}
                    links={link_group_hero}
                />*/}
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <DOLExperience fetchid={fetchid} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

DOLPageViewExperience.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPageViewExperience));
