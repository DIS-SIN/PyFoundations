import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { connect } from "react-redux";
import DOLAddContentFormControls from './DOLAddContentFormControls';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({
    appBar: {
        position: 'fixed',
        backgroundColor: '#232323',
    },
    appBarStatic: {
        position: 'static',
        backgroundColor: '#232323',
    },
    headerAppbarDark: {
        backgroundColor: '#232323',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
})

const imageAI = '/static/images/covers/ai.jpg';
const imageDA = '/static/images/covers/data_analysis.jpg';
const imageDS = '/static/images/covers/design.jpg';
const imageDV = '/static/images/covers/development.jpg';
const imageDO = '/static/images/covers/devops.jpg';
const imageDG = '/static/images/covers/digital_government.png';
const imageDL = '/static/images/covers/digital_literacy.jpg';
const imageDR = '/static/images/covers/disruptive.png';
const imageLD = '/static/images/covers/leadership.jpg';

const tileData = [
    {
        img: imageAI,
        title: 'Artificial Intelligence',
        author: 'System',
    },
    {
        img: imageDA,
        title: 'Data Analysis',
        author: 'System',
    },
    {
        img: imageDS,
        title: 'Design',
        author: 'System',
    },
    {
        img: imageDV,
        title: 'Development',
        author: 'System',
    },
    {
        img: imageDO,
        title: 'DevOps',
        author: 'System',
    },
    {
        img: imageDG,
        title: 'Digital Government',
        author: 'System',
    },
    {
        img: imageDL,
        title: 'Digital Literacy',
        author: 'System',
    },
    {
        img: imageDR,
        title: 'Disruptive Technology',
        author: 'System',
    },
    {
        img: imageLD,
        title: 'Leadership',
        author: 'System',
    },
];


class DOLAddContentFormContainer extends React.Component {
    state = {
        accessible: false,
        clear: false,
        entertaining: false,
        relevant: false,
        informative: false,
        insightful: false,
        useful: false,
        verb: null,
        stream: null,
        valuable: null,
        difficulty: null,
        duration: null,
        url: "",
        tag1: "",
        tag2: "",
        tag3: "",
        episodetitle: "",
        episodetagline: "",
        episodeblogtext: "",
        episodevideotitle: "",
        episodevideodescription: "",
        episodevideourl: "",
        episodepodcasttitle: "",
        episodepodcastdescription: "",
        episodepodcasturl: "",
        isepisodetype: false,
        itemcover: imageAI,
        validsubmission: false,
    };

    shallowValidate = () => {
        const { accessible, clear, entertaining, relevant, informative,
            insightful, useful, verb, stream, valuable, difficulty, duration,
            url, tag1, tag2, tag3, episodetitle, episodetagline, episodeblogtext,
            episodevideotitle, episodevideodescription, episodevideourl,
            episodepodcasttitle, episodepodcastdescription, episodepodcasturl,
            isepisodetype, itemcover, validsubmission } = this.state;

        //console.log(validsubmission);
        this.setState({
            validsubmission: (isepisodetype == true) ?
                (
                    episodetitle != "" &&
                    episodetagline != "" &&
                    episodeblogtext != "" &&
                    episodevideotitle != "" &&
                    episodevideodescription != "" &&
                    episodevideourl != "" &&
                    episodepodcasttitle != "" &&
                    episodepodcastdescription != "" &&
                    episodepodcasturl != ""
                ) && (
                    stream != null &&
                    valuable != null &&
                    difficulty != null &&
                    duration != null &&
                    tag1 != "" &&
                    tag2 != "" &&
                    tag3 != ""
                ) : (
                    accessible == true ||
                    clear == true ||
                    entertaining == true ||
                    relevant == true ||
                    informative == true ||
                    insightful == true ||
                    useful == true
                ) && (
                    verb != null &&
                    url != "" &&
                    stream != null &&
                    valuable != null &&
                    difficulty != null &&
                    duration != null &&
                    tag1 != "" &&
                    tag2 != "" &&
                    tag3 != ""
                )
        });
    }
    handleClear = () => {
        //console.log(this.state.stream);
        this.setState({
            accessible: false,
            clear: false,
            entertaining: false,
            relevant: false,
            informative: false,
            insightful: false,
            useful: false,
            verb: null,
            stream: null,
            valuable: null,
            difficulty: null,
            duration: null,
            url: "",
            tag1: "",
            tag2: "",
            tag3: "",
            episodetitle: "",
            episodetagline: "",
            episodeblogtext: "",
            episodevideotitle: "",
            episodevideodescription: "",
            episodevideourl: "",
            episodepodcasttitle: "",
            episodepodcastdescription: "",
            episodepodcasturl: "",
            isepisodetype: false,
            itemcover: imageAI,
            validsubmission: false,
        },
            this.shallowValidate
        );
    };
    handleChangeCover = img => {
        this.setState({ itemcover: img });
    };
    handleChangeControl = name => event => {
        event.target.type === "checkbox" ?
            (
                this.setState({ [name]: event.target.checked }, this.shallowValidate)
            ) : (
                this.setState({ [name]: event.target.value }, this.shallowValidate)
            )

    }
    handleSave = async e => {
        e.preventDefault();
        let api_url = "/api/experience";
        let api_post = {};
        if (this.state.isepisodetype == true) {
            api_url = "/api/episode";
            api_post = {
                "title": this.state.episodetitle,
                "tagline": this.state.episodetagline,
                "sub_title": this.state.episodetagline,
                "body": this.state.episodeblogtext,
                "author": "TBD",
                "image": { "src": this.state.itemcover },
                "videos": {
                    "title": this.state.episodevideotitle,
                    "description": this.state.episodevideodescription,
                    "url": this.state.episodevideourl
                },
                podcasts: {
                    "title": this.state.episodepodcasttitle,
                    "description": this.state.episodepodcastdescription,
                    "url": this.state.episodepodcasturl
                },
                likes: 0,
                published_on: "",
                edits: {},
                tags: [{
                    "tag": this.state.tag1
                }, {
                    "tag": this.state.tag2
                }, {
                    "tag": this.state.tag3
                }],
                learning_points: {},
                learning_resources: {},
                experience: {},
                digital_standards: {},
                banner_image: this.state.itemcover,
                slug: this.state.episodetitle
            };
        } else {
            api_url = "/api/experience";
            api_post = {
                "user_name": "TBD",
                "verb": this.state.verb,
                "stream": this.state.stream,
                "practices": {},
                skills: {},
                learning_resource_id: 0,
                learning_resource: {},
                occurred_at: "",
                validated: false,
                time: "",
                value: this.state.valuable,
                difficulty: this.state.difficulty,
                points: 0,
                depth: 0,
                tags: [{
                    "tag": this.state.tag1
                }, {
                    "tag": this.state.tag2
                }, {
                    "tag": this.state.tag3
                }],
                comments: {},
            };
        }
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(api_post),
        });
        const body = await response.json();//response.text();
        this.setState({
            responseToPost: body
        });
        alert(JSON.stringify(body));
        this.props.handleClose();
    }

    render() {
        //console.log("render: ", this.state.stream);
        const { classes, literals, handleClose, appFixed } = this.props;
        const { validsubmission } = this.state;

        return (
            <React.Fragment>

                <AppBar className={appFixed ? classes.appBar : classes.appBarStatic}>
                    <Toolbar className={classes.headerAppbarDark}>
                        {handleClose ? (<IconButton color="inherit" onClick={handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>) : null}
                        <Typography variant="h6" color="inherit" className={classes.flex}>
                            {literals.organisms.primaryactionpanel.title}
                        </Typography>
                        <Button color="inherit" onClick={this.handleClear}>
                            {literals.common.clear}
                        </Button>
                    </Toolbar>
                </AppBar>
                <form onSubmit={this.handleSave}>

                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        <DOLAddContentFormControls
                            shallowValidate={this.shallowValidate}
                            handleChangeControl={this.handleChangeControl}
                            handleChangeCover={this.handleChangeCover}
                            handleSave={this.handleSave}
                            tileData={tileData}
                            {...this.state} />
                        {validsubmission == true ? (
                            <Typography variant="button" component="div">
                                Valid Submission!
                            </Typography>
                        ) : (
                                <Typography variant="button" component="div">
                                    Form Incomplete...
                            </Typography>
                            )}
                    </div>
                </form>

            </React.Fragment>
        );
    }
}

DOLAddContentFormContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(DOLAddContentFormContainer));
