// redux reducer for literals
const defaultState = {};

export const LOAD_STREAMS = "LOAD_STREAMS";

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case LOAD_STREAMS:
            return payload;
        default:
            return state;
    }
};

