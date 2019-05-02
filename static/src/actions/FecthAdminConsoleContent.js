import { LOAD_ADMIN_CONSOLE_CONTENT } from './../store/adminConsoleContent'
import { checkHttpStatus, parseJSON } from './../utils/http'
import { errorResultHandler } from './../utils/errorHandler'

export function loadAdminConsoleContent(){
    return dispatch => {
        return fetch("/api/admin/content", {
            method: 'GET'
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then( response => {
            dispatch(contentResultHandler(response));
        })
        .catch( error => {
            dispatch(contentResultHandler([]));
            dispatch(errorResultHandler(error.message));
        })
    }
}

export const contentResultHandler = adminConsoleContent => ({
    type: LOAD_ADMIN_CONSOLE_CONTENT,
    payload: adminConsoleContent,
});