import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DOLExploreDrawer from './DOLExploreDrawer';

// connect the state from redux
import { connect } from "react-redux";
import HeaderLogoItem from '../atoms/HeaderLogoItem';

import HeaderMenuItem from '../atoms/HeaderMenuItem';
import HeaderMenuItemMobile from '../atoms/HeaderMenuItemMobile';
import HeaderMenuItemDesktop from '../atoms/HeaderMenuItemDesktop';

import LangSelectMenuItemDesktop from '../atoms/LangSelectMenuItemDesktop';
import LangSelectMenuItemMobile from '../atoms/LangSelectMenuItemMobile';
import LangSelectMenuItem from '../atoms/LangSelectMenuItem';
const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#232323',
    },
    headerAppbarDark: {
        backgroundColor: '#f50057',
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
        const { literals, classes, location } = this.props;
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
                <HeaderMenuItem
                    href="/samples/dashboard"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.samples.dashboard}
                    action={this.handleMenuClose}
                />
                <HeaderMenuItem
                    href="/samples/showcase"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.samples.showcase}
                    action={this.handleMenuClose}
                />
                <HeaderMenuItem
                    href="/samples/album"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.samples.album}
                    action={this.handleMenuClose}
                />
                <HeaderMenuItem
                    href="/samples/signin"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.samples.signin}
                    action={this.handleMenuClose}
                />
                <HeaderMenuItem
                    href="/samples/pricing"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.samples.pricing}
                    action={this.handleMenuClose}
                />
                <LangSelectMenuItem location={location} />
                <HeaderMenuItem
                    href="/settings"
                    icon={<SettingsIcon />}
                    text={literals.organisms.header.menu.settings}
                    action={this.handleMenuClose}
                />
                <HeaderMenuItem
                    href="/logout"
                    icon={<LockIcon />}
                    text={literals.organisms.header.menu.logout}
                    action={this.handleMenuClose}
                />
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
                <HeaderMenuItemMobile
                    href="/home"
                    icon={<HomeIcon />}
                    text={literals.common.home}
                    action={this.handleMobileMenuClose}
                />
                <HeaderMenuItemMobile
                    href="/explore"
                    icon={<ImageSearchIcon />}
                    text={literals.organisms.header.menu.explore}
                    action={this.handleMobileMenuClose}
                />
                <HeaderMenuItemMobile
                    href="/about"
                    icon={<HelpOutlineIcon />}
                    text={literals.organisms.header.menu.about}
                    action={this.handleMobileMenuClose}
                />
                <LangSelectMenuItemMobile location={location} />
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.headerAppbarDark}>
                    <Toolbar className={classes.headerAppbarDark}>
                        <DOLExploreDrawer />
                        <HeaderLogoItem text={literals.organisms.header.menu.logo} href="/home" />
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <HeaderMenuItemDesktop
                                href="/home"
                                icon={<HomeIcon />}
                                text={literals.common.home}
                            />
                            <HeaderMenuItemDesktop
                                href="/explore"
                                icon={<ImageSearchIcon />}
                                text={literals.organisms.header.menu.explore}
                            />
                            <HeaderMenuItemDesktop
                                href="/about"
                                icon={<HelpOutlineIcon />}
                                text={literals.organisms.header.menu.about}
                            />
                            <LangSelectMenuItemDesktop location={location} />
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