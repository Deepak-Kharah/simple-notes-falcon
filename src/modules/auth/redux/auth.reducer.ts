import { AuthReducerPayload } from "../types/auth.types";
import { authDispatch } from "./auth.dispatch-type";
import getConfig from "next/config";
import { NextConfig } from "next";
import { NextConfigPublicRuntimeConfig } from "../../common/types/config.types";

export const initialState = {
    isAuthenticated: false,
    userDetails: {
        username: "",
    },
    isLoading: false,
    hasAuthCheckedOnce: false,
    redirectUrl: "/",
};

function auth(
    state = initialState,
    action: AuthReducerPayload
): typeof initialState {
    const { publicRuntimeConfig } = getConfig() as NextConfig;
    const { authRoutes } = publicRuntimeConfig as NextConfigPublicRuntimeConfig;

    switch (action.type) {
        case authDispatch.USER_LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true,
                userDetails: {
                    ...state.userDetails,
                    username: action.payload?.username,
                },
                hasAuthCheckedOnce: true,
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
        case authDispatch.USER_LOGGED_OUT:
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
            const redirectUrl = action.payload?.redirectUrl;
            if (authRoutes.includes(redirectUrl)) return state;
            return {
                ...state,
                redirectUrl: action.payload?.redirectUrl,
                hasAuthCheckedOnce: true,
            };
        case authDispatch.RESET_REDIRECT_URL:
            return {
                ...state,
                redirectUrl: initialState.redirectUrl,
            };
        case authDispatch.INITIAL_AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                hasAuthCheckedOnce: true,
                userDetails: {
                    ...state.userDetails,
                    username: action.payload?.username,
                },
            };
        default:
            return state;
    }
}

export default auth;
