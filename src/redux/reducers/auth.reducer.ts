import { AuthReducerPayload } from "../../types/redux/auth.types";
import { authDispatch } from "../types";

export const initialState = {
    isAuthenticated: false,
    userDetails: {
        username: "",
    },
};

function auth(
    state = initialState,
    action: AuthReducerPayload
): typeof initialState {
    switch (action.type) {
        case authDispatch.USER_LOGGED_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userDetails: {
                    ...state.userDetails,
                    username: action.payload?.username,
                },
            };
        case authDispatch.AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                userDetails: {
                    ...state.userDetails,
                    username: "",
                },
            };
        default:
            return state;
    }
}

export default auth;
