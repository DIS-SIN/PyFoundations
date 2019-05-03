import React from 'react';
import PropTypes from 'prop-types';import { connect } from "react-redux";
import Promise from 'promise-polyfill';
import "whatwg-fetch";
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, withTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import GridInfoCard from "../molecules/GridInfoCard";

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};


// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}

const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    layout: {
        width: 'auto',
        marginLeft: 0,//theme.spacing.unit * 3,
        marginRight: 0,//theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
        paddingTop: 16,
        backgroundColor: theme.palette.background.paper,
        margin: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
    },
    progress: {
        margin: theme.spacing.unit * 2,
        flexGrow: 1,
    },
});

const ApiDataItem = props => (
    <React.Fragment>
        <Typography gutterBottom variant="overline" component="div">{props.apiitem.description}</Typography>
        <Typography gutterBottom variant="subtitle2" component="div">{props.apiitem.slug}</Typography>
        <Typography gutterBottom variant="button" component="div">{props.literals.common.tags}</Typography>
        <ApiDataItemChild apiitem={props.apiitem} childnode="tags" childval="tag" />
    </React.Fragment>
);
const ApiDataItemChild = props => (
    props.apiitem[props.childnode] === null ? (
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

class DOLPractices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            learningpoints: [],
            post: "",
            response: "",
            responseToPost: "",
            apireturn_status: null,
        };
    }

    // this fires when the component loads

    componentDidMount() {
        if(this.props.streamId){
            fetch("/api/learningStreams" + (this.props.streamId ? "/" + this.props.streamId : "")) // dol/api/gettest // /api/learning_point
            .then((res) => {
                //console.log(res.status);
                this.setState({
                    apireturn_status: res.status
                });
                return res.json();
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        apireturn: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        // end fetch
        } else {
            fetch("/api/learningPractices") // dol/api/gettest // /api/learning_point
            .then((res) => {
                //console.log(res.status);
                this.setState({
                    apireturn_status: res.status
                });
                return res.json();
            })
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        isLoaded: true,
                        apireturn: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        // end fetch
        }
        
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { error, isLoaded, apireturn, post, response, responseToPost, apireturn_status } = this.state;
        const { literals, location, classes } = this.props;

        const link_group_hero = [
            { "href": "/explore", "title": literals.common.explore },
        ];
        const link_group_practices = [
            { "href": "/view/practice", "title": literals.common.explore + " " + literals.organisms.primaryactionpanel.ctrl.practice},
        ];

        let apiDataItem = "";
        let apiDataItemBundle = "";

        if (error) {
            apiDataItem = (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.error} {error.message}
                    </Typography>
                </Grid>
            );
        } else if (!isLoaded) {
            apiDataItem = (
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        {literals.ajaxtest.loading}...
                    </Typography>
                    <div className={classes.progress}>
                        <LinearProgress color="secondary" />
                    </div>
                </Grid>
            );
        } else {

            if (apireturn_status === 200) {
                let api_content = apireturn
                if(apireturn[0].learningPractices){
                    api_content = [];
                    apireturn[0].learningPractices.map(element => {
                        api_content = api_content.concat(element.learningPractice)
                    });
                }
                const apiRenderItems = api_content.map((apiitem, index) => (
                    <GridInfoCard
                        key={index}
                        title={apiitem.name}
                        cover="http://placeimg.com/640/360/tech"
                        text={<ApiDataItem apiitem={apiitem} index={index} literals={literals} />}
                        links={link_group_practices}
                        xs={12} sm={3} md={3}
                        fetchid={apiitem.id}
                    />
                ));
                apiDataItemBundle = (
                    <React.Fragment>
                        {apiRenderItems}
                    </React.Fragment>
                );
            } else {
                apiDataItemBundle = (
                    <Typography variant="button" color="inherit">
                        ...
                    </Typography>
                );
            }
            apiDataItem = (
                <React.Fragment>
                    {apiDataItemBundle}
                </React.Fragment>
            );
        }

        //  {apiDataItem}
        const returnFragment = (
            <React.Fragment>
                <Grid spacing={8} container>
                    {apiDataItem}
                </Grid>
            </React.Fragment>
        )
        return returnFragment;
    }
}

DOLPractices.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLPractices));

/**
 *                 <Grid container spacing={16}>
                    <Grid item sm={12}>
                        <AppBar className={classNames(classes.segment)} position="static" color="default">
                            <Toolbar>
                                <Typography justify="center" variant="h5" component="div">
                                    {literals.common.practices}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>
 */