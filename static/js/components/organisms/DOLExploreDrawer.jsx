import React, { Component } from "react";
import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const theme = createMuiTheme({
    overrides: {
        MuiListItemText: { // Name of the component ⚛️ / style sheet
            primary: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
    },
    typography: { useNextVariants: true },
});

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawerDark: {
        backgroundColor: '#333333',
        color: '#ffffff',
    },
    drawerTextLight: {
        color: '#ffffff',
    },

});

// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

const ApiDataItem = props => (
    <React.Fragment>
        <ApiDataItemChildText apiitem={props.apiitem} childnode="learning_targets" childval="learning_targets" />
        <Typography gutterBottom variant="h6" component="div">{props.literals.common.practices}</Typography>
        <ApiDataItemChild apiitem={props.apiitem} childnode="tags" childval="tag" />
    </React.Fragment>
);
const ApiDataItemChildText = props => (
    props.apiitem[props.childnode] == null ? (
        <React.Fragment key={props.index}>
            <Typography gutterBottom variant="button" component="div">
                ...
            </Typography>
        </React.Fragment>
    ) : (
            props.apiitem[props.childnode].map((item, index) => (
                <React.Fragment key={index}>
                    <Typography gutterBottom variant="body1" component="div">
                        {item[props.childval] ? item[props.childval] : item}
                    </Typography>
                </React.Fragment>
            ))
        )
); const ApiDataItemChild = props => (
    props.apiitem[props.childnode] == null ? (
        <React.Fragment key={props.index}>
            <Typography gutterBottom variant="button" component="div">
                ...
            </Typography>
        </React.Fragment>
    ) : (
            props.apiitem[props.childnode].map((item, index) => (
                <React.Fragment key={index}>
                    <Chip
                        icon={props.icon ? props.icon : null}
                        label={item[props.childval] ? item[props.childval] : item}
                        color="primary"
                    />
                </React.Fragment>
            ))
        )
);

class DOLExploreDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorStream: null,
            isLoadedStream: false,
            errorPractice: null,
            isLoadedPractice: false,
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: "",
            top: false,
            left: false,
            bottom: false,
            right: false,
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    // this fires when the component loads

    componentDidMount() {
        fetch("/api/stream") // dol/api/gettest // /api/learning_point
            .then(res => res.json())
            .then(
                (resultStream) => {
                    //console.log(result);
                    this.setState({
                        isLoadedStream: true,
                        apireturn_stream: resultStream
                    });
                },
                (errorStream) => {
                    this.setState({
                        isLoadedStream: true,
                        errorStream
                    });
                }
            )
        fetch("/api/practice") // dol/api/gettest // /api/learning_point
            .then(res => res.json())
            .then(
                (resultPractice) => {
                    //console.log(result);
                    this.setState({
                        isLoadedPractice: true,
                        apireturn_practice: resultPractice
                    });
                },
                (errorPractice) => {
                    this.setState({
                        isLoadedPractice: true,
                        errorPractice
                    });
                }
            )
        // end fetch
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { errorStream, errorPractice, isLoadedStream, isLoadedPractice, apireturn_stream, apireturn_practice, post, response, responseToPost } = this.state;
        const { literals, location, classes } = this.props;
        let apiDataItem = "";

        if (errorStream || errorPractice) {
            apiDataItem = (
                <ListItem button component={Link} to="/explore" key="drawerError" >
                    <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                        {literals.ajaxtest.error}
                    </Typography>
                    <div className={classes.progress}>
                        <LinearProgress color="secondary" />
                    </div>
                </ListItem >
            );
        } else if (!isLoadedStream || !isLoadedPractice) {
            apiDataItem = (
                <ListItem button component={Link} to="/explore" key="drawerLoading" >
                    <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                        {literals.ajaxtest.loading}...
                    </Typography>
                    <div className={classes.progress}>
                        <LinearProgress color="secondary" />
                    </div>
                </ListItem >
            );
        } else {
            const api_state_stream = apireturn_stream.slice(0)[0].api_return;
            const api_content_stream = apireturn_stream.slice(0)[0].api_data;

            const api_state_practice = apireturn_practice.slice(0)[0].api_return;
            const api_content_practice = apireturn_practice.slice(0)[0].api_data;

            if (api_state_stream === "success" && api_state_practice === "success") {
                if (api_content_stream.length === 0 || api_content_practice.length === 0) {
                    //alert("N O D A T A, API OK " + api_content.length);
                    apiDataItem = (
                        <ListItem button component={Link} to="/view/stream" key="drawerNoRec" >
                            <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                                ...
                            </Typography>
                        </ListItem >
                    );
                } else {
                    const learningArchStreamItems = api_content_stream.map((apiitem, index) => (
                        <ListItem button component={Link} to={"/view/stream/" + apiitem.id} key={index} >
                            <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                                {apiitem.name}
                            </Typography>
                        </ListItem >
                    ));
                    const learningArchPracticeItems = api_content_practice.map((apiitem, index) => (
                        <ListItem button component={Link} to={"/view/practice/" + apiitem.id} key={index} >
                            <Typography component={ListItem} secondary={literals.common.practice} variant="button" color="inherit" className={classes.drawerTextLight}>
                                {apiitem.name}
                            </Typography>
                        </ListItem >
                    ));
                    apiDataItem = (
                        <div className={classes.fullList}>
                            <List className={classes.drawerDark}>{/** learningarchitecture.loach_structure.streams[].stream */}
                                <ListItem button component={Link} to="/explore/streams" key="expStreams" >
                                    <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                                        {literals.common.streams}
                                    </Typography>
                                </ListItem>
                                {learningArchStreamItems}
                                <Divider />
                                <ListItem button component={Link} to="/explore/practices" key="expPractices" >
                                    <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                                        {literals.common.practices}
                                    </Typography>
                                </ListItem>
                                {learningArchPracticeItems}
                            </List>
                        </div>
                    );

                }
            } else {
                apiDataItem = (
                    <ListItem button component={Link} to="/explore" key={index} >
                        <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                            ...
                        </Typography>
                    </ListItem >
                );
            }
        }
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
                        {apiDataItem}
                    </div>
                </Drawer>
            </React.Fragment>
        );
    }
}

DOLExploreDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLExploreDrawer));
