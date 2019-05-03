// redux reducer for literals
const defaultState = {};

export const CHANGE_CONTENT_STATUS = "CHANGE_CONTENT_STATUS";

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case CHANGE_CONTENT_STATUS:
            return payload;
        default:
            return state;
    }
};

