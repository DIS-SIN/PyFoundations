import { ERROR } from './../store/error'

export const errorResultHandler = error => ({
    type: ERROR,
    payload: {status: "error", message: error}
});