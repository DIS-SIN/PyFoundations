import React from 'react';
import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
// import { createMuiTheme } from '@material-ui/core/styles';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

// const theme = createMuiTheme({
//     overrides: {
//         MuiListItemText: { // Name of the component ⚛️ / style sheet
//             primary: { // Name of the rule
//                 color: 'white', // Some CSS
//             },
//         },
//     },
//     typography: { useNextVariants: true },
// });

const styles = theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawerDark: {
        backgroundColor: '#2E294E',
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

// const ApiDataItem = props => (
//     <React.Fragment>
//         <ApiDataItemChildText apiitem={props.apiitem} childnode="learning_targets" childval="target_name" />
//         <Typography gutterBottom variant="h6" component="div">{props.literals.common.practices}</Typography>
//         <ApiDataItemChild apiitem={props.apiitem} childnode="tags" childval="tag" />
//     </React.Fragment>
// );
// const ApiDataItemChildText = props => (
//     props.apiitem[props.childnode] == null ? (
//         <React.Fragment key={props.index}>
//             <Typography gutterBottom variant="button" component="div">
//                 ...
//             </Typography>
//         </React.Fragment>
//     ) : (
//             props.apiitem[props.childnode].map((item, index) => (
//                 <React.Fragment key={index}>
//                     <Typography gutterBottom variant="body1" component="div">
//                         {item[props.childval] ? item[props.childval] : item}
//                     </Typography>
//                 </React.Fragment>
//             ))
//         )
// ); const ApiDataItemChild = props => (
//     props.apiitem[props.childnode] == null ? (
//         <React.Fragment key={props.index}>
//             <Typography gutterBottom variant="button" component="div">
//                 ...
//             </Typography>
//         </React.Fragment>
//     ) : (
//             props.apiitem[props.childnode].map((item, index) => (
//                 <React.Fragment key={index}>
//                     <Chip
//                         icon={props.icon ? props.icon : null}
//                         label={item[props.childval] ? item[props.childval] : item}
//                         color="primary"
//                     />
//                 </React.Fragment>
//             ))
//         )
// );

class DOLExploreDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorStream: null,
            isLoadedStream: false,
            apireturn_status_stream: null,
            errorPractice: null,
            isLoadedPractice: false,
            apireturn_status_practice: null,
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
        fetch("/api/learningStreams") // dol/api/gettest // /api/learning_point
            .then((res) => {
                //console.log(res.status);
                this.setState({
                    apireturn_status_stream: res.status
                });
                return res.json();
            })
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
        fetch("/api/learningPractices") // dol/api/gettest // /api/learning_point
            //.then(res => res.json())
            .then((res) => {
                //console.log(res.status);
                //res.status     //=> number 100–599
                //res.statusText //=> String
                //res.headers    //=> Headers
                //res.url        //=> String
                this.setState({
                    apireturn_status_practice: res.status
                });
                //let resjson = res.status == 200 ? res.json() : [res.json()]
                return res.json();
            })
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
        const { errorStream, errorPractice, isLoadedStream, isLoadedPractice,
            apireturn_status_stream, apireturn_status_practice, apireturn_stream, apireturn_practice } = this.state;
        const { literals, classes } = this.props;
        let apiDataItem = "";
        let apiDataItemStream = "";
        let apiDataItemPractice = "";

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
            if (apireturn_status_stream === 200) {
                const api_content_stream = apireturn_stream;
                const learningArchStreamItems = api_content_stream.map((apiitem, index) => (
                    <ListItem button component={Link} to={"/view/stream/" + apiitem[0].id} key={index} >
                        <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                            {apiitem[0].name}
                        </Typography>
                    </ListItem >
                ));
                apiDataItemStream = (
                    <React.Fragment>
                        {learningArchStreamItems}
                    </React.Fragment>
                );
            } else {
                apiDataItemStream = (
                    <ListItem button component={Link} to="/view/stream" key="drawerNoRec" >
                        <Typography component={ListItem} secondary={literals.common.streams} variant="button" color="inherit" className={classes.drawerTextLight}>
                            ...
                        </Typography>
                    </ListItem >
                );
            }
            if (apireturn_status_practice === 200) {
                const api_content_practice = apireturn_practice;
                const learningArchPracticeItems = api_content_practice.map((apiitem, index) => (
                    <ListItem button component={Link} to={"/view/practice/" + apiitem[0].id} key={index} >
                        <Typography component={ListItem} secondary={literals.common.practices} variant="button" color="inherit" className={classes.drawerTextLight}>
                            {apiitem[0].name}
                        </Typography>
                    </ListItem >
                ));
                apiDataItemPractice = (
                    <React.Fragment>
                        {learningArchPracticeItems}
                    </React.Fragment>
                );
            } else {
                apiDataItemPractice = (
                    <ListItem button component={Link} to="/view/practice" key="drawerNoRec" >
                        <Typography component={ListItem} secondary={literals.common.practices} variant="button" color="inherit" className={classes.drawerTextLight}>
                            ...
                        </Typography>
                    </ListItem >
                );
            }
            apiDataItem = (
                <React.Fragment>
                    <ListItem button component={Link} to="/explore/streams" key="expStreams" >
                        <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                            {literals.common.streams}
                        </Typography>
                    </ListItem>
                    {apiDataItemStream}
                    <Divider />
                    <ListItem button component={Link} to="/explore/practices" key="expPractices" >
                        <Typography component={ListItem} variant="h6" color="inherit" className={classes.drawerTextLight}>
                            {literals.common.practices}
                        </Typography>
                    </ListItem>
                    {apiDataItemPractice}
                </React.Fragment>
            );
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
                        <div className={classes.fullList}>
                            <List className={classes.drawerDark}>{/** learningarchitecture.loach_structure.streams[].stream */}
                                {apiDataItem}
                            </List>
                        </div>
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
