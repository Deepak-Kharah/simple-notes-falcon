import { AuthReducerPayload } from "../../types/redux/auth.types";
import { authDispatch } from "../types";

export const initialState = {
    isAuthenticated: false,
    userDetails: {
        username: "",
    },
    isLoading: false,
    redirectUrl: "",
};

function auth(
    state = initialState,
    action: AuthReducerPayload
): typeof initialState {
    switch (action.type) {
        case authDispatch.USER_LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true,
                userDetails: {
                    ...state.userDetails,
                    username: action.payload?.username,
                },
                isLoading: false,
            };
        case authDispatch.USER_CREATED:
            return {
                ...state,
            };
        case authDispatch.AUTH_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case authDispatch.AUTH_ERROR:
        case authDispatch.USER_CREATE_FAILED:
        case authDispatch.USER_LOGGED_IN_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                userDetails: {
                    ...state.userDetails,
                    username: "",
                },
                isLoading: false,
            };
        case authDispatch.SET_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: action.payload?.redirectUrl,
            };
        default:
            return state;
    }
}

export default auth;
