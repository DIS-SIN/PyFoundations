import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DOLHeader from "../organisms/DOLHeader";
import DOLFooter from "../organisms/DOLFooter";
import DOLPrimaryActionPanel from "../organisms/DOLPrimaryActionPanel";

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DOLPageExploreEpisodes from "../views/DOLPageExploreEpisodes";
import DOLEpisodes from "../organisms/DOLEpisodes";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};
/*
const styles = theme => ({
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
    },
})
*/

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        padding: 0,
        margin: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        color: 'white',
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#333333',//'rgb(0,140,160)',
        color: 'white',
    },
    content: {
        flexGrow: 1,
        padding: 0,//theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    highContrast: {
        color: 'white',
    }
});

class DOLViewLayout extends React.Component {

    render() {
        const { literals, classes, match, content, location } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <DOLHeader className={classes.appBar} location={location} />
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        <List>
                            {['Add to Profile', 'Rate Content', 'Related Content'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon className={classes.highContrast}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} classes={{ primary: classes.highContrast }} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['Share Content', 'Comment', 'Like'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon className={classes.highContrast}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} classes={{ primary: classes.highContrast }} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {content}
                        <DOLPrimaryActionPanel />
                        <DOLFooter />
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

DOLViewLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

// connect redux state
//export default connect(mapStateToProps)(withStyles(styles)(DOLLayout));
export default withRouter(connect(mapStateToProps)(withStyles(styles)(DOLViewLayout)));

