import axios from "axios";
import { authDispatch } from "./auth.dispatch-type";
import {
    LoginDto,
    RegisterDto,
    UserWithoutPasswordDto,
} from "../types/auth.dto";
import { Dispatch } from "../../redux/store";
import { uiAlertDispatch } from "../../ui-message/redux/ui-message.dispatch-type";
import { UseToastOptions } from "@chakra-ui/react";

export const loginUser =
    ({ username, password }: LoginDto) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: authDispatch.AUTH_LOADING,
            });
            const response = await axios.post<UserWithoutPasswordDto>(
                "/auth/login",
                {
                    username,
                    password,
                }
            );

            dispatch({
                type: authDispatch.USER_LOGGED_IN,
                payload: response.data,
            });
        } catch (error: any) {
            dispatch({
                type: authDispatch.USER_LOGGED_IN_FAILED,
            });

            dispatch({
                type: uiAlertDispatch.UI_ALERT_ADD,
                payload: {
                    alert: {
                        title: "You have entered invalid username or password",
                        status: "error",
                    } as UseToastOptions,
                },
            });
        }

        return null;
    };

export function registerUser({ username, password }: RegisterDto) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: authDispatch.AUTH_LOADING,
            });

            await axios.post<UserWithoutPasswordDto>("/users/register", {
                username,
                password,
            });

            dispatch({
                type: authDispatch.USER_CREATED,
            });

            loginUser({ username, password })(dispatch);
        } catch (error) {
            dispatch({
                type: authDispatch.USER_CREATE_FAILED,
            });
            console.error("register error", error);
        }

        return null;
    };
}

export function isUserLoggedin() {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: authDispatch.AUTH_LOADING,
            });
            const response = await axios.get<UserWithoutPasswordDto>(
                "/users/me"
            );

            const { username } = response.data;

            dispatch({
                type: authDispatch.INITIAL_AUTH_SUCCESS,
                payload: {
                    username,
                },
            });
        } catch (error) {
            dispatch({
                type: authDispatch.AUTH_ERROR,
            });
        }
    };
}

export function logoutUser() {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: authDispatch.AUTH_LOADING,
            });
            await axios.get("/auth/logout");

            dispatch({
                type: authDispatch.USER_LOGGED_OUT,
            });
        } catch (error) {
            console.error("logout error", error);
        }
    };
}
