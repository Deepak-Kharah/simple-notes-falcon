import axios from "axios";
import { authDispatch } from "../types";
import { UserWithoutPasswordDto } from "../../types/redux/auth.types";
import { LoginDto, RegisterDto } from "../../types/auth/auth.dto";
import { Dispatch } from "../store";

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
