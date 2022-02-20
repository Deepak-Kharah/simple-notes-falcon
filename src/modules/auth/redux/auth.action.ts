import axios from "axios";
import { authDispatch } from "./auth.dispatch-type";
import {
    LoginDto,
    RegisterDto,
    UserWithoutPasswordDto,
} from "../types/auth.dto";
import { Dispatch } from "../../redux/store";

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
        } catch (error) {
            dispatch({
                type: authDispatch.USER_LOGGED_IN_FAILED,
            });
            console.error("login error", error);
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
            console.error("get user error", error);
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
