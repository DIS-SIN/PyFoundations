import React, { Component } from "react";
import { connect } from "react-redux"; // redux state
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LearningArchitecture from "../atoms/LearningArchitecture";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GridInfoCard from "../molecules/GridInfoCard";

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: 100,
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
    segment: {
        flexGrow: 1,
        marginBottom: 16,
        marginTop: 16,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

class DOLPractices extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { literals, location, classes } = this.props;

        const practices = LearningArchitecture().loach_structure.architecture; // note just design for now
        const link_group_practice = [
            { "href": "/view/practice", "title": literals.common.explore },
            { "href": "/profile/add/practice", "title": literals.common.addto + " " + literals.common.profile },
        ];
        return (
            <React.Fragment>
                <AppBar className={classNames(classes.segment)} position="static" color="default">
                    <Toolbar>
                        <Typography justify="center" variant="h5" component="div">
                            {literals.common.practices}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={40}>
                    {practices.map((item, index) => (
                        <GridInfoCard
                            key={index}
                            title={item.practice}
                            cover="http://placeimg.com/640/360/tech"
                            text={item.practice}
                            links={link_group_practice}
                        />
                    ))}
                </Grid>
            </React.Fragment>
        );
    }
}

DOLPractices.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
export default connect(mapStateToProps)(withStyles(styles)(DOLPractices));



