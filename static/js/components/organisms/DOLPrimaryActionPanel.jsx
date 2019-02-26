import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import classNames from 'classnames';
import { connect } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    };
    handleChangeText = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChangeRadio = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };



    render() {
        //console.log("render: ", this.state.stream);
        const { classes, literals } = this.props;
        const { accessible, clear, entertaining, relevant, informative,
            insightful, useful, verb, stream, valuable, difficulty, duration,
            url, tag1, tag2, tag3 } = this.state;

        const verb_form_control_fields = [
            { "value": "read", "label": "Read", "checked": verb },
            { "value": "watch", "label": "Watch", "checked": verb },
            { "value": "listen", "label": "Listen", "checked": verb },
            { "value": "participate", "label": "Participate", "checked": verb },
            { "value": "practice", "label": "Practice", "checked": verb },
            { "value": "study", "label": "Study", "checked": verb },
            { "value": "do", "label": "Do", "checked": verb },
        ];
        const impression_form_control_fields = [
            { "value": "accessible", "label": "Accessible", "checked": accessible },
            { "value": "clear", "label": "Clear", "checked": clear },
            { "value": "entertaining", "label": "Entertaining", "checked": entertaining },
            { "value": "relevant", "label": "Participate", "checked": relevant },
            { "value": "informative", "label": "Informative", "checked": informative },
            { "value": "insightful", "label": "Insightful", "checked": insightful },
            { "value": "useful", "label": "Useful", "checked": useful },
        ];
        const stream_form_control_fields = [
            { "value": "0", "label": "Digital Government", "checked": stream },
            { "value": "1", "label": "Digital Literacy", "checked": stream },
            { "value": "2", "label": "Design", "checked": stream },
            { "value": "3", "label": "Leadership", "checked": stream },
            { "value": "4", "label": "Disruptive Technology", "checked": stream },
            { "value": "5", "label": "Data Analysis", "checked": stream },
            { "value": "6", "label": "AI / Machine Learning", "checked": stream },
            { "value": "7", "label": "DevOps", "checked": stream },
            { "value": "8", "label": "Development", "checked": stream },
        ];
        const duration_form_control_fields = [
            { "value": "0d0h15m", "label": "A few minutes", "checked": duration },
            { "value": "0d0h60m", "label": "30 - 60 Minutes", "checked": duration },
            { "value": "0d3h0m", "label": "A few hours", "checked": duration },
            { "value": "3d0h0m", "label": "A few days", "checked": duration },
            { "value": "21d0h0m", "label": "Weeks", "checked": duration },
        ];
        const valuable_form_control_fields = [
            { "value": "0", "label": "Little value", "checked": valuable },
            { "value": "1", "label": "Pretty useful", "checked": valuable },
            { "value": "2", "label": "Solid learning", "checked": valuable },
            { "value": "3", "label": "Very good content", "checked": valuable },
            { "value": "4", "label": "Amazing learning experience", "checked": valuable },
        ];
        const difficulty_form_control_fields = [
            { "value": "0", "label": "Easy", "checked": difficulty },
            { "value": "1", "label": "Some tricky concepts", "checked": difficulty },
            { "value": "2", "label": "Advanced", "checked": difficulty },
            { "value": "3", "label": "My brain hurts!", "checked": difficulty },
        ];
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
                                            {verb_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                            {impression_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    control={
                                                        <Checkbox
                                                            checked={ctrl.checked}
                                                            onChange={this.handleChangeCheckbox(ctrl.value)}
                                                            value={ctrl.value}
                                                        />
                                                    }
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                            {stream_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                            {duration_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                            {valuable_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                            {difficulty_form_control_fields.map((ctrl, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={ctrl.value}
                                                    control={<Radio checked={ctrl.checked === ctrl.value ? "checked" : ""} />}
                                                    label={ctrl.label}
                                                />
                                            ))}
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
                                        Save Experience
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
