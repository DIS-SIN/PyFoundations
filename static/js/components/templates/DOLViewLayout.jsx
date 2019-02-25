import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DOLHeader from "../organisms/DOLHeader";
import DOLFooter from "../organisms/DOLFooter";
import DOLPrimaryActionPanel from "../organisms/DOLPrimaryActionPanel";
import Hidden from '@material-ui/core/Hidden';
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
import MenuIcon from '@material-ui/icons/Menu';
import NavigationIcon from '@material-ui/icons/Navigation';
import DOLPageExploreEpisodes from "../views/DOLPageExploreEpisodes";
import DOLEpisodes from "../organisms/DOLEpisodes";
import ScrollToTop from "../atoms/ScrollToTop";
import { Link } from 'react-router-dom';
import { IconButton, Button, Fab } from "@material-ui/core";

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
    //appBar: {
    //    zIndex: theme.zIndex.drawer + 1,
    //},
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },

    /*drawer: {
        width: drawerWidth,
        flexShrink: 0,
        color: 'white',
    },*/
    drawer: {
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
            color: 'white',
        },
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
    },
    menuButtonActions: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    fabButtonDrawer: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
});
class DOLViewLayout extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    render() {
        const { literals, classes, theme, match, content, location, fetchid } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <List>
                    {['Back', 'Add to Profile', 'Rate Content', 'Related Content'].map((text, index) => (
                        <ListItem component={Link} to={"/explore/" + fetchid} button key={text}>
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
            </div>
        );
        return (
            <React.Fragment>
                <ScrollToTop />
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <DOLHeader className={classes.appBar} location={location} />
                        </Toolbar>
                    </AppBar>

                    <nav className={classes.drawer}>
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>

                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.menuButtonActions}>
                            <DOLPrimaryActionPanel />
                        </div>
                        <Fab
                            variant="extended"
                            color="secondary"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.fabButtonDrawer}>
                            <NavigationIcon />
                            {literals.common.actions}
                        </Fab>
                        {content}
                        <DOLFooter />
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
/**
 * <Button
                            color="secondary"
                            variant="contained"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon /> {literals.common.actions}
                        </Button>
 */
DOLViewLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

// connect redux state
//export default connect(mapStateToProps)(withStyles(styles)(DOLLayout));
export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DOLViewLayout)));

