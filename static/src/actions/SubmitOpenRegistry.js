import { checkHttpStatus, parseJSON } from './../utils/http'
import { noticeHandler } from './../utils/noticeHandler'

export function submitOpenRegistry(content){
    return dispatch => {
        return fetch("/api/open-registry", {
            method: 'POST',
            body: {
                url: content.url,
                streams: content.streams 
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then( response => {
            dispatch(noticeHandler({status: "success", message: response.message}))
        })
        .catch( error => {
            dispatch(noticeHandler({status: "error", message: error.message}))
        })
    }
}