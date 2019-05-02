import {LOAD_STREAMS} from './../store/streams'
import { checkHttpStatus, parseJSON } from './../utils/http'
import { errorResultHandler } from './../utils/errorHandler'

export function loadStreams(){
    return dispatch => {
        return fetch("/api/learningStreams")
        .then(checkHttpStatus)
        .then(parseJSON)
        .then( response => {
            dispatch(streamResultHandler(response));
        })
        .catch( error => {
            dispatch(errorResultHandler(error.message));
        })
    }
}

export const streamResultHandler = streams => ({
    type: LOAD_STREAMS,
    payload: streams,
});