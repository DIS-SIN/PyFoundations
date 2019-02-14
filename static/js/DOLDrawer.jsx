import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LabelIcon from '@material-ui/icons/Label';
import MailIcon from '@material-ui/icons/Mail';
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';


import { LearningArchitecture } from './LearningArchitecture'

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
        //console.log(LearningArchitecture);
        const la = LearningArchitecture();
        const { classes } = this.props;
        //learningarchitecture.loach_structure.streams[].stream
        /*
                const sideList = (
                    <div className={classes.list}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                );
        
                const fullList = (
                    <div className={classes.fullList}>
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                );
        */

        //const data = learningpoints.slice(0);
        const practices = la.loach_structure.architecture.slice(0);
        const streams = la.loach_structure.streams.slice(0);

        //<small><strong>{tag.tagname}</strong> ({tag.id}@{tag.datetime})</small>

        const learningArchStreamItems = streams.map((learningarch, index) => (
            <ListItem button key={index} >
                <ListItemIcon>
                    <Chip
                        icon={<ArchiveIcon />}
                        label="Stream"
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemText primary={learningarch.stream} />
            </ListItem >
        ));
        const learningArchPracticeItems = practices.map((learningarch, index) => (
            <ListItem button key={index} >
                <ListItemIcon>
                    <Chip
                        icon={<InboxIcon />}
                        label="Practice"
                        color="primary"
                    />
                </ListItemIcon>
                <ListItemText primary={learningarch.practice} />
            </ListItem >
        ));


        /**
         *             
                        {learningpoint.tags.map((tag, index) => (
                            <React.Fragment key={index}>
                                <Chip
                                    icon={<LabelIcon />}
                                    label={tag.tagname + " @" + tag.id + " " + tag.datetime}
                                    color="primary"
                                />
                            </React.Fragment>
                        ))}=
                    
         */

        const learnList = (
            <div className={classes.fullList}>
                <List>{/** learningarchitecture.loach_structure.streams[].stream */}
                    <Typography component={ListItem} variant="h6">
                        STREAMS
                    </Typography>
                    {learningArchStreamItems}
                    <Divider />
                    <Typography component={ListItem} variant="h6">
                        PRACTICES
                    </Typography>
                    {learningArchPracticeItems}
                </List>
            </div>
        );

        /**<Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
            <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
            <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
                    <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}
              >
                {fullList}
              </div>
            </Drawer>
            <Drawer
              anchor="bottom"
              open={this.state.bottom}
              onClose={this.toggleDrawer('bottom', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('bottom', false)}
                onKeyDown={this.toggleDrawer('bottom', false)}
              >
                {fullList}
              </div>
            </Drawer>
            <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('right', false)}
                onKeyDown={this.toggleDrawer('right', false)}
              >
                {sideList}
              </div>
            </Drawer>
             */
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

export default withStyles(styles)(DOLDrawer);