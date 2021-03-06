import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const mapStateToProps = state => {
    return {
        literals: state.literals
    };
};

const styles = theme => ({

    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    coverimgpicker: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.secondary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
})

class DOLAddContentFormControls extends React.Component {


    render() {
        const { tileData, handleChangeControl, handleChangeCover,
            classes, literals,
            accessible, clear, entertaining, relevant, informative,
            insightful, useful, verb, stream, valuable, difficulty, duration,
            url, tag1, tag2, tag3, episodetitle, episodetagline, episodeblogtext,
            episodevideotitle, episodevideodescription, episodevideourl,
            episodepodcasttitle, episodepodcastdescription, episodepodcasturl,
            isepisodetype, itemcover, validsubmission } = this.props;

        const verb_form_control_fields = [
            { "value": "read", "label": literals.organisms.primaryactionpanel.ctrl.read, "checked": verb },
            { "value": "watch", "label": literals.organisms.primaryactionpanel.ctrl.watch, "checked": verb },
            { "value": "listen", "label": literals.organisms.primaryactionpanel.ctrl.listen, "checked": verb },
            { "value": "participate", "label": literals.organisms.primaryactionpanel.ctrl.participate, "checked": verb },
            { "value": "practice", "label": literals.organisms.primaryactionpanel.ctrl.practice, "checked": verb },
            { "value": "study", "label": literals.organisms.primaryactionpanel.ctrl.study, "checked": verb },
            { "value": "do", "label": literals.organisms.primaryactionpanel.ctrl.do, "checked": verb },
        ];
        const impression_form_control_fields = [
            { "value": "accessible", "label": literals.organisms.primaryactionpanel.ctrl.accessible, "checked": accessible },
            { "value": "clear", "label": literals.organisms.primaryactionpanel.ctrl.clear, "checked": clear },
            { "value": "entertaining", "label": literals.organisms.primaryactionpanel.ctrl.entertaining, "checked": entertaining },
            { "value": "relevant", "label": literals.organisms.primaryactionpanel.ctrl.participate, "checked": relevant },
            { "value": "informative", "label": literals.organisms.primaryactionpanel.ctrl.informative, "checked": informative },
            { "value": "insightful", "label": literals.organisms.primaryactionpanel.ctrl.insightful, "checked": insightful },
            { "value": "useful", "label": literals.organisms.primaryactionpanel.ctrl.useful, "checked": useful },
        ];
        const stream_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.digitalgov, "checked": stream },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.digitalliteracy, "checked": stream },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.design, "checked": stream },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.leadership, "checked": stream },
            { "value": "4", "label": literals.organisms.primaryactionpanel.ctrl.disruptivetech, "checked": stream },
            { "value": "5", "label": literals.organisms.primaryactionpanel.ctrl.dataanalysis, "checked": stream },
            { "value": "6", "label": literals.organisms.primaryactionpanel.ctrl.aiml, "checked": stream },
            { "value": "7", "label": literals.organisms.primaryactionpanel.ctrl.devops, "checked": stream },
            { "value": "8", "label": literals.organisms.primaryactionpanel.ctrl.development, "checked": stream },
        ];
        const duration_form_control_fields = [
            { "value": "0d0h15m", "label": literals.organisms.primaryactionpanel.ctrl.times.few, "checked": duration },
            { "value": "0d0h60m", "label": literals.organisms.primaryactionpanel.ctrl.times.some, "checked": duration },
            { "value": "0d3h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.hours, "checked": duration },
            { "value": "3d0h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.days, "checked": duration },
            { "value": "21d0h0m", "label": literals.organisms.primaryactionpanel.ctrl.times.weeks, "checked": duration },
        ];
        const valuable_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.value.little, "checked": valuable },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.value.some, "checked": valuable },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.value.solid, "checked": valuable },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.value.good, "checked": valuable },
            { "value": "4", "label": literals.organisms.primaryactionpanel.ctrl.value.great, "checked": valuable },
        ];
        const difficulty_form_control_fields = [
            { "value": "0", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.easy, "checked": difficulty },
            { "value": "1", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.normal, "checked": difficulty },
            { "value": "2", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.hard, "checked": difficulty },
            { "value": "3", "label": literals.organisms.primaryactionpanel.ctrl.difficulty.expert, "checked": difficulty },
        ];
        return (
            <React.Fragment>
                <FormControlLabel
                    control={
                        <Switch
                            checked={isepisodetype}
                            onChange={handleChangeControl('isepisodetype')}
                            value="isepisodetype"
                        />
                    }
                    label={
                        <Typography variant="h6" color="inherit" component="span">
                            {literals.organisms.primaryactionpanel.episodeformat}
                        </Typography>
                    }
                />
                {isepisodetype === true && <React.Fragment>
                    <DialogTitle id="form-dialog-title">
                        {literals.organisms.primaryactionpanel.addepisode}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={12}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.writeyourmasterpiece}
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="episodetitle"
                                    label={literals.organisms.primaryactionpanel.episodetitle}
                                    type="text"
                                    fullWidth
                                    value={episodetitle}
                                    onChange={handleChangeControl('episodetitle')}
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="episodetagline"
                                    label={literals.organisms.primaryactionpanel.episodetagline}
                                    type="text"
                                    fullWidth
                                    value={episodetagline}
                                    onChange={handleChangeControl('episodetagline')}
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="episodeblogtext"
                                    label={literals.organisms.primaryactionpanel.episodeblogtext}
                                    type="textarea"
                                    fullWidth
                                    multiline={true}
                                    value={episodeblogtext}
                                    onChange={handleChangeControl('episodeblogtext')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.episodeaddavideo}
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="episodevideotitle"
                                    label={literals.organisms.primaryactionpanel.episodevideotitle}
                                    type="text"
                                    fullWidth
                                    value={episodevideotitle}
                                    onChange={handleChangeControl('episodevideotitle')}
                                />
                                <TextField
                                    margin="dense"
                                    id="episodevideodescription"
                                    label={literals.organisms.primaryactionpanel.episodevideodescription}
                                    type="text"
                                    fullWidth
                                    value={episodevideodescription}
                                    onChange={handleChangeControl('episodevideodescription')}
                                />
                                <TextField
                                    margin="dense"
                                    id="episodevideourl"
                                    label={literals.organisms.primaryactionpanel.episodevideourl}
                                    type="url"
                                    fullWidth
                                    value={episodevideourl}
                                    onChange={handleChangeControl('episodevideourl')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.episodeaddapodcast}
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="episodepodcasttitle"
                                    label={literals.organisms.primaryactionpanel.episodepodcasttitle}
                                    type="text"
                                    fullWidth
                                    value={episodepodcasttitle}
                                    onChange={handleChangeControl('episodepodcasttitle')}
                                />
                                <TextField
                                    margin="dense"
                                    id="episodepodcastdescription"
                                    label={literals.organisms.primaryactionpanel.episodepodcastdescription}
                                    type="text"
                                    fullWidth
                                    value={episodepodcastdescription}
                                    onChange={handleChangeControl('episodepodcastdescription')}
                                />
                                <TextField
                                    margin="dense"
                                    id="episodepodcasturl"
                                    label={literals.organisms.primaryactionpanel.episodepodcasturl}
                                    type="url"
                                    fullWidth
                                    value={episodepodcasturl}
                                    onChange={handleChangeControl('episodepodcasturl')}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                </React.Fragment>}
                {isepisodetype === false && <React.Fragment>
                    <DialogTitle id="form-dialog-title">
                        {literals.organisms.primaryactionpanel.formtitle}
                    </DialogTitle>
                </React.Fragment>}
                <DialogContent>
                    <Grid container spacing={16}>
                        {isepisodetype === false && <React.Fragment>
                            <Grid item xs={12} sm={12}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.urltitle}
                                </DialogContentText>
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="url"
                                    label={literals.organisms.primaryactionpanel.urllabel}
                                    type="url"
                                    fullWidth
                                    value={url}
                                    onChange={handleChangeControl('url')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.verbtitle}
                                </DialogContentText>
                                <FormControl required component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">{literals.organisms.primaryactionpanel.verblabel}</FormLabel>
                                    <RadioGroup

                                        aria-label={literals.organisms.primaryactionpanel.verblabel}
                                        name="verb"
                                        className={classes.group}
                                        value={verb}
                                        onChange={handleChangeControl('verb')}
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

                            <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                                <DialogContentText component={Typography} variant="subtitle2">
                                    {literals.organisms.primaryactionpanel.impressiontitle}
                                </DialogContentText>
                                <FormControl required component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">{literals.organisms.primaryactionpanel.impressionlabel}</FormLabel>
                                    <FormGroup>
                                        {impression_form_control_fields.map((ctrl, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox

                                                        checked={ctrl.checked}
                                                        onChange={handleChangeControl(ctrl.value)}
                                                        value={ctrl.value}
                                                    />
                                                }
                                                label={ctrl.label}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </React.Fragment>}
                        <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.streamtitle}
                            </DialogContentText>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">{literals.organisms.primaryactionpanel.streamlabel}</FormLabel>
                                <RadioGroup

                                    aria-label={literals.organisms.primaryactionpanel.streamlabel}
                                    name="stream"
                                    className={classes.group}
                                    value={stream}
                                    onChange={handleChangeControl('stream')}
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
                        <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.durationtitle}
                            </DialogContentText>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">{literals.organisms.primaryactionpanel.durationlabel}</FormLabel>
                                <RadioGroup

                                    aria-label={literals.organisms.primaryactionpanel.durationlabel}
                                    name="duration"
                                    className={classes.group}
                                    value={duration}
                                    onChange={handleChangeControl('duration')}
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
                        <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.valuabletitle}
                            </DialogContentText>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">{literals.organisms.primaryactionpanel.valuablelabel}</FormLabel>
                                <RadioGroup

                                    aria-label={literals.organisms.primaryactionpanel.valuablelabel}
                                    name="valuable"
                                    className={classes.group}
                                    value={valuable}
                                    onChange={handleChangeControl('valuable')}
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
                        <Grid item xs={12} sm={isepisodetype === false ? 4 : 6}>
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.difficultytitle}
                            </DialogContentText>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">{literals.organisms.primaryactionpanel.difficultylabel}</FormLabel>
                                <RadioGroup

                                    aria-label={literals.organisms.primaryactionpanel.difficultylabel}
                                    name="difficulty"
                                    className={classes.group}
                                    value={difficulty}
                                    onChange={handleChangeControl('difficulty')}
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
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.tagtitle}
                            </DialogContentText>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                margin="dense"
                                id="tag1"
                                label={literals.common.tag + " #1"}
                                type="text"
                                value={tag1}
                                onChange={handleChangeControl('tag1')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                margin="dense"
                                id="tag1"
                                label={literals.common.tag + " #2"}
                                type="text"
                                value={tag2}
                                onChange={handleChangeControl('tag2')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                margin="dense"
                                id="tag1"
                                label={literals.common.tag + " #3"}
                                type="text"
                                value={tag3}
                                onChange={handleChangeControl('tag3')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText component={Typography} variant="subtitle2">
                                {literals.organisms.primaryactionpanel.pickcover}
                            </DialogContentText>
                            <div className={classes.coverimgpicker}>
                                <GridList className={classes.gridList} cols={2.5}>
                                    {tileData.map(tile => (
                                        <GridListTile key={tile.img} onClick={(img) => handleChangeCover(tile.img)}>
                                            <img src={tile.img} alt={tile.title} />
                                            <GridListTileBar
                                                title={tile.title}
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}
                                                actionIcon={

                                                    itemcover === tile.img ?
                                                        <StarIcon className={classes.title} />
                                                        :
                                                        <StarBorderIcon className={classes.title} />


                                                }
                                            />
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {validsubmission === false ? (
                                <Button type="submit" disabled variant="contained" color="secondary" className={classes.button}>
                                    {isepisodetype === false ? literals.organisms.primaryactionpanel.saveexp : literals.organisms.primaryactionpanel.saveepisode}
                                </Button>
                            ) : (
                                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                                        {isepisodetype === false ? literals.organisms.primaryactionpanel.saveexp : literals.organisms.primaryactionpanel.saveepisode}
                                    </Button>
                                )}
                        </Grid>
                    </Grid>
                </DialogContent>
            </React.Fragment>
        );
    }
}

DOLAddContentFormControls.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(withStyles(styles)(DOLAddContentFormControls));
