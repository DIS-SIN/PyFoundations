import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LockIcon from '@material-ui/icons/Lock';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DOLDrawer from './DOLDrawer';
import { Link } from 'react-router-dom';

// connect the state from redux
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: 10
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class DOLHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
    };

    handleSettingsMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { literals, classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem component={Link} to="/dashboard" onClick={this.handleMenuClose}>
                    <SettingsIcon /> Dashboard Example
                </MenuItem>
                <MenuItem component={Link} to="/showcase" onClick={this.handleMenuClose}>
                    <SettingsIcon /> Showcase Example
                </MenuItem>
                <MenuItem component={Link} to="/logout" onClick={this.handleMenuClose}>
                    <LockIcon /> Logout
                </MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem component={Link} to="/explore" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <ImageSearchIcon />
                        </Badge>
                    </IconButton>
                    <p>Explore</p>
                </MenuItem>
                <MenuItem component={Link} to="/share" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <AddCommentIcon />
                        </Badge>
                    </IconButton>
                    <p>Share</p>
                </MenuItem>
                <MenuItem component={Link} to="/about" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <HelpOutlineIcon />
                        </Badge>
                    </IconButton>
                    <p>About</p>
                </MenuItem>
                <MenuItem component={Link} to="/profile" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem component={Link} to="/settings" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <SettingsIcon />
                    </IconButton>
                    <p>Settings</p>
                </MenuItem>
                <MenuItem component={Link} to="/logout" onClick={this.handleMobileMenuClose}>
                    <IconButton color="inherit">
                        <LockIcon />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <DOLDrawer />
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Digital Open Learning
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button color="inherit" component={Link} to="/explore">
                                <ImageSearchIcon /> Explore
                            </Button>
                            <Button color="inherit" component={Link} to="/share">
                                <AddCommentIcon /> Share
                            </Button>
                            <Button color="inherit" component={Link} to="/about">
                                <HelpOutlineIcon /> About
                            </Button>
                            <Button color="inherit" component={Link} to="/profile">
                                <AccountCircle /> Profile
                            </Button>
                            <IconButton color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSettingsMenuOpen}
                                color="inherit"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>

                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

DOLHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(DOLHeader);
export default connect(mapStateToProps)(withStyles(styles)(DOLHeader));