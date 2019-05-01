import {LOAD_STREAMS} from './../store/streams';
import { ERROR } from './../store/error';
import { checkHttpStatus, parseJSON } from './../utils/http';

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

export const errorResultHandler = error => ({
    type: ERROR,
    payload: {status: "error", message: error}
});