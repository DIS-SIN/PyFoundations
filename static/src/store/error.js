// redux reducer for literals
const defaultState = {};

export const ERROR = "error";

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case ERROR:
            return payload;
        default:
            return state;
    }
};

