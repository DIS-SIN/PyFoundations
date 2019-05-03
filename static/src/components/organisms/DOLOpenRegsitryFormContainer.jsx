import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import TextInput from '../atoms/TextInput'
import CheckBox from '../atoms/CheckBox'

import store from '../../store'
import { submitOpenRegistry } from '../../actions/SubmitOpenRegistry'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

const mapStateToProps = state => {
    return {
        literals: state.literals,
        notice: state.notice,
        streams: state.streams
    };
};

class DOLOpenRegistryFormContainer extends React.Component {
    state = {
        values: {
            url: "",
            streams: []
        }
    }

    handleURLChange = (input) => {
        let values = this.state.values
        values["url"] = input
        this.setState({values: values})
    }

    handleStreamChange = (input) => {
        let values = this.state.values
        if(input.checked){
            values.streams.push(input.value)
        } else {
            let streams = values.streams
            let newStreams = []
            streams.forEach(stream => {
                if(stream !== input.value){
                    newStreams.push(input.value)
                }
            })
            values["streams"] = newStreams 
        }
        this.setState({values: values}) 
    }

    submitContent = () => {
        store.dispatch(submitOpenRegistry(this.state.values))
    }

    render(){
        const { classes, streams } = this.props

        let streamOptions = []
        if(streams.length){
            streamOptions = []
            streams.forEach(stream => {
                streamOptions.push({value: stream[0].id, label: stream[0].name})
            })
        }
        return (
            <form>
                <Typography component="h4" variant="headline" gutterBottom>
                    DOL Open Registry
                </Typography>
                <TextInput label={"URL"} value={this.state.values.url} onChange={this.handleURLChange} />
                <CheckBox label={"Streams"} values={streamOptions} onChange={this.handleStreamChange} />
                <Button onClick={this.submitContent} variant="contained" color="primary" className={classes.button}>
                    Submit
                </Button>
            </form>
        )
    }
}

DOLOpenRegistryFormContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(DOLOpenRegistryFormContainer));