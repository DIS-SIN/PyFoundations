// redux reducer for literals
const defaultState = {};

export const NOTICE = "error";

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case NOTICE:
            return payload;
        default:
            return state;
    }
};

