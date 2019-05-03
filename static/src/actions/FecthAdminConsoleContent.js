import { LOAD_ADMIN_CONSOLE_CONTENT } from './../store/adminConsoleContent'
import { checkHttpStatus, parseJSON } from './../utils/http'
import { noticeHandler } from './../utils/noticeHandler'

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
            dispatch(noticeHandler({status: "error", message: error.message}));
        })
    }
}

export const contentResultHandler = adminConsoleContent => ({
    type: LOAD_ADMIN_CONSOLE_CONTENT,
    payload: adminConsoleContent,
});