import { NOTICE } from './../store/notice'

export const noticeHandler = payload => ({
    type: NOTICE,
    payload: payload
});