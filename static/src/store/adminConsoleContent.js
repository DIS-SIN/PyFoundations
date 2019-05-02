// redux reducer for literals
const defaultState = {};

export const LOAD_ADMIN_CONSOLE_CONTENT = "LOAD_ADMIN_CONSOLE_CONTENT";

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case LOAD_ADMIN_CONSOLE_CONTENT:
            return payload;
        default:
            return state;
    }
};

