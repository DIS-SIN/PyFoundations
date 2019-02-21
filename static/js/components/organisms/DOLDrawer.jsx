import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';
import { connect } from "react-redux";
import { LearningArchitecture } from '../atoms/LearningArchitecture'
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class DOLDrawer extends React.Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const la = LearningArchitecture();
        const { classes, literals } = this.props;

        const practices = la.loach_structure.architecture.slice(0);
        const streams = la.loach_structure.streams.slice(0);

        const learningArchStreamItems = streams.map((learningarch, index) => (
            <ListItem button component={Link} to="/view/stream" key={index} >
                <ListItemIcon>
                    <Chip
                        icon={<ArchiveIcon />}
                        label={literals.common.streams}
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemText primary={learningarch.stream} />
            </ListItem >
        ));
        const learningArchPracticeItems = practices.map((learningarch, index) => (
            <ListItem button component={Link} to="/view/practice" key={index} >
                <ListItemIcon>
                    <Chip
                        icon={<InboxIcon />}
                        label={literals.common.practices}
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemText primary={learningarch.practice} />
            </ListItem >
        ));

        const learnList = (
            <div className={classes.fullList}>
                <List>{/** learningarchitecture.loach_structure.streams[].stream */}
                    <Typography component={ListItem} variant="h6">
                        {literals.common.streams}
                    </Typography>
                    {learningArchStreamItems}
                    <Divider />
                    <Typography component={ListItem} variant="h6">
                        {literals.common.practices}
                    </Typography>
                    {learningArchPracticeItems}
                </List>
            </div>
        );

        return (
            <React.Fragment>
                <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                    <MenuIcon />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {learnList}
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

DOLDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLDrawer));