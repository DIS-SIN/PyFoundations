import {LOAD_STREAMS} from './../store/streams'
import { checkHttpStatus, parseJSON } from './../utils/http'
import { noticeHandler } from './../utils/noticeHandler'

export function loadStreams(){
    return dispatch => {
        return fetch("/api/learningStreams")
        .then(checkHttpStatus)
        .then(parseJSON)
        .then( response => {
            dispatch(streamResultHandler(response));
        })
        .catch( error => {
            dispatch(noticeHandler({status: "error", message: error.message}));
        })
    }
}

export const streamResultHandler = streams => ({
    type: LOAD_STREAMS,
    payload: streams,
});