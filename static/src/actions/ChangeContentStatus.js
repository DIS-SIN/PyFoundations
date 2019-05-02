import { CHANGE_CONTENT_STATUS } from './../store/contentStatus'
import { checkHttpStatus, parseJSON } from './../utils/http'
import { errorResultHandler } from './../utils/errorHandler'
import { loadAdminConsoleContent } from './FecthAdminConsoleContent'


export function changeContentStatus(content_id, approved){
    return dispatch => {
        return fetch("/api/admin/content", {
            method: 'PUT',
            body: {
                content_id: content_id,
                approved: approved 
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then( response => {
            dispatch(loadAdminConsoleContent())
            dispatch(statusResultHandler(response))
        })
        .catch( error => {
            dispatch(loadAdminConsoleContent())
            dispatch(errorResultHandler(error.message))
        })
    }
}

export const statusResultHandler = contentStatusChangeResponse => ({
    type: CHANGE_CONTENT_STATUS,
    payload: contentStatusChangeResponse,
});