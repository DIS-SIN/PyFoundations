import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AjaxTest from '../../samples/AjaxTest';
import classNames from 'classnames';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { connect } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import ScrollToTop from "../atoms/ScrollToTop";

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
    headerAppbarDark: {
        backgroundColor: '#232323',
    },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    fabButton: {
        position: 'fixed',
        zIndex: 1,
        bottom: 35,
        left: 'auto',
        right: 35,
        margin: '0 auto',
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
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function peekAtState(name, props, state, nextProps, nextState) {
    console.log(state.stream);
    console.log(nextState)
    return true;//state[name] !== nextState[name] || nextState[name] === null
};

class DOLPrimaryActionPanel extends React.Component {
    state = {
        open: false,
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
    };

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
        });
        //this.render();
        //this.forceUpdate();
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeText = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleChangeRadio = name => event => {
        //console.log([name] + " " + name + " " + this.state[name] + " > " + event.target.value);
        this.setState({ [name]: event.target.value });
        // this.render();
    };

    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    /*
        shouldComponentUpdate(nextProps, nextState) {
            return true;
            //return peekAtState('stream', this.props, this.state, nextProps, nextState)
            //    || peekAtState('accessible', this.props, this.state, nextProps, nextState)
        };*/

    render() {
        //console.log("render: ", this.state.stream);
        const { classes, literals } = this.props;
        const { accessible, clear, entertaining, relevant, informative,
            insightful, useful, verb, stream, valuable, difficulty, duration,
            url, tag1, tag2, tag3 } = this.state;
        return (
            <div>
                <ScrollToTop />
                <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen} className={classes.fabButton}>
                    <AddIcon />
                </Fab>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.headerAppbarDark}>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {literals.organisms.primaryactionpanel.title}
                            </Typography>
                            <Button color="inherit" onClick={this.handleClear}>
                                {literals.common.clear}
                            </Button>
                            <Button color="inherit" onClick={this.handleClose}>
                                {literals.common.save}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/*<Typography variant="h5" color="inherit">
                            Learning experiences happen everywhere. Tell us about yours.
                        </Typography>*/}
                        <DialogTitle id="form-dialog-title">Learning experiences happen everywhere. Tell us about yours.</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={12}>
                                    <DialogContentText>
                                        Where can you find your learning experience?
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="url"
                                        label="Paste your URL here..."
                                        type="url"
                                        fullWidth
                                        value={url}
                                        onChange={this.handleChangeText('url')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        What kind of content is it?
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Content Type</FormLabel>
                                        <RadioGroup
                                            aria-label="Content Type"
                                            name="verb"
                                            className={classes.group}
                                            value={verb}
                                            onChange={this.handleChangeRadio('verb')}
                                        >
                                            <FormControlLabel value="read" control={<Radio checked={verb === "read" ? "checked" : ""} />} label="Read" />
                                            <FormControlLabel value="watch" control={<Radio checked={verb === "watch" ? "checked" : ""} />} label="Watch" />
                                            <FormControlLabel value="listen" control={<Radio checked={verb === "listen" ? "checked" : ""} />} label="Listen" />
                                            <FormControlLabel value="participate" control={<Radio checked={verb === "participate" ? "checked" : ""} />} label="Participate" />
                                            <FormControlLabel value="practice" control={<Radio checked={verb === "practice" ? "checked" : ""} />} label="Practice" />
                                            <FormControlLabel value="study" control={<Radio checked={verb === "study" ? "checked" : ""} />} label="Study" />
                                            <FormControlLabel value="do" control={<Radio checked={verb === "do" ? "checked" : ""} />} label="Do" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        How would you describe the learning experience? Choose as many tags as you need.
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Impression</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={accessible}
                                                        onChange={this.handleChangeCheckbox('accessible')}
                                                        value="accessible"
                                                    />
                                                }
                                                label="Accessible"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={clear}
                                                        onChange={this.handleChangeCheckbox('clear')}
                                                        value="clear"
                                                    />
                                                }
                                                label="Clear"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={entertaining}
                                                        onChange={this.handleChangeCheckbox('entertaining')}
                                                        value="entertaining"
                                                    />
                                                }
                                                label="Entertaining"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={relevant}
                                                        onChange={this.handleChangeCheckbox('relevant')}
                                                        value="relevant"
                                                    />
                                                }
                                                label="Relevant"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={informative}
                                                        onChange={this.handleChangeCheckbox('informative')}
                                                        value="informative"
                                                    />
                                                }
                                                label="Informative"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={insightful}
                                                        onChange={this.handleChangeCheckbox('insightful')}
                                                        value="insightful"
                                                    />
                                                }
                                                label="Insightful"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={useful}
                                                        onChange={this.handleChangeCheckbox('useful')}
                                                        value="useful"
                                                    />
                                                }
                                                label="Useful"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        What digital stream does this belong to?
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Digital Stream</FormLabel>
                                        <RadioGroup
                                            aria-label="Stream"
                                            name="stream"
                                            className={classes.group}
                                            value={stream}
                                            onChange={this.handleChangeRadio('stream')}
                                        >
                                            <FormControlLabel value="0" control={<Radio checked={stream === "0" ? "checked" : ""} />} label="Digital Government" />
                                            <FormControlLabel value="1" control={<Radio checked={stream === "1" ? "checked" : ""} />} label="Digital Literacy" />
                                            <FormControlLabel value="2" control={<Radio checked={stream === "2" ? "checked" : ""} />} label="Design" />
                                            <FormControlLabel value="3" control={<Radio checked={stream === "3" ? "checked" : ""} />} label="Leadership" />
                                            <FormControlLabel value="4" control={<Radio checked={stream === "4" ? "checked" : ""} />} label="Disruptive Technology" />
                                            <FormControlLabel value="5" control={<Radio checked={stream === "5" ? "checked" : ""} />} label="Data Analysis" />
                                            <FormControlLabel value="6" control={<Radio checked={stream === "6" ? "checked" : ""} />} label="AI / Machine Learning" />
                                            <FormControlLabel value="7" control={<Radio checked={stream === "7" ? "checked" : ""} />} label="DevOps" />
                                            <FormControlLabel value="8" control={<Radio checked={stream === "8" ? "checked" : ""} />} label="Development" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        How long did it take?
                                    </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Duration</FormLabel>
                                        <RadioGroup
                                            aria-label="Duration"
                                            name="duration"
                                            className={classes.group}
                                            value={duration}
                                            onChange={this.handleChangeRadio('duration')}
                                        >
                                            <FormControlLabel value="0d0h15m" control={<Radio checked={duration === "0d0h15m" ? "checked" : ""} />} label="A few minutes" />
                                            <FormControlLabel value="0d0h60m" control={<Radio checked={duration === "0d0h60m" ? "checked" : ""} />} label="30 - 60 minutes" />
                                            <FormControlLabel value="0d3h0m" control={<Radio checked={duration === "0d3h0m" ? "checked" : ""} />} label="A few hours" />
                                            <FormControlLabel value="3d0h0m" control={<Radio checked={duration === "3d0h0m" ? "checked" : ""} />} label="A few days" />
                                            <FormControlLabel value="21d0h0m" control={<Radio checked={duration === "21d0h0m" ? "checked" : ""} />} label="Weeks" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        How valuable was it?
                                </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Value</FormLabel>
                                        <RadioGroup
                                            aria-label="Valuable"
                                            name="valuable"
                                            className={classes.group}
                                            value={valuable}
                                            onChange={this.handleChangeRadio('valuable')}
                                        >
                                            <FormControlLabel value="0" control={<Radio checked={valuable === "0" ? "checked" : ""} />} label="Little value" />
                                            <FormControlLabel value="1" control={<Radio checked={valuable === "1" ? "checked" : ""} />} label="Pretty useful" />
                                            <FormControlLabel value="2" control={<Radio checked={valuable === "2" ? "checked" : ""} />} label="Solid learning" />
                                            <FormControlLabel value="3" control={<Radio checked={valuable === "3" ? "checked" : ""} />} label="Very good content" />
                                            <FormControlLabel value="4" control={<Radio checked={valuable === "4" ? "checked" : ""} />} label="Amazing learning experience" />

                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DialogContentText>
                                        How difficult was it?
                                </DialogContentText>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Difficulty</FormLabel>
                                        <RadioGroup
                                            aria-label="Difficulty"
                                            name="difficulty"
                                            className={classes.group}
                                            value={difficulty}
                                            onChange={this.handleChangeRadio('difficulty')}
                                        >
                                            <FormControlLabel value="0" control={<Radio checked={difficulty === "0" ? "checked" : ""} />} label="Easy" />
                                            <FormControlLabel value="1" control={<Radio checked={difficulty === "1" ? "checked" : ""} />} label="Some tricky concepts" />
                                            <FormControlLabel value="2" control={<Radio checked={difficulty === "2" ? "checked" : ""} />} label="Advanced" />
                                            <FormControlLabel value="3" control={<Radio checked={difficulty === "3" ? "checked" : ""} />} label="My brain hurts!" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <DialogContentText>
                                        If you want, you can add one or more personal tags to describe your experience. This will help us give you better suggestions later.
                                    </DialogContentText>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label="Tag #1"
                                        type="text"
                                        value={tag1}
                                        onChange={this.handleChangeText('tag1')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label="Tag #2"
                                        type="text"
                                        value={tag2}
                                        onChange={this.handleChangeText('tag2')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="dense"
                                        id="tag1"
                                        label="Tag #3"
                                        type="text"
                                        value={tag3}
                                        onChange={this.handleChangeText('tag3')}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        <CloudUploadIcon /> Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </div>
                </Dialog>
            </div >
        );
    }
}

DOLPrimaryActionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(DOLPrimaryActionPanel));
