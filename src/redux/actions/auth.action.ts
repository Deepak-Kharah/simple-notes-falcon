import { Dispatch } from "redux";
import axios from "axios";
import { authDispatch } from "../types";
import { UserWithoutPasswordDto } from "../../types/redux/auth.types";
import { LoginDto } from "../../types/auth/auth.dto";

export const loginUser =
    ({ username, password }: LoginDto) =>
    async (dispatch: Dispatch) => {
        try {
            const response = await axios.post<UserWithoutPasswordDto>(
                "/auth/login",
                {
                    username,
                    password,
                }
            );

            dispatch({
                type: authDispatch.USER_LOGGED_IN_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.error("auth error", error);
        }

        return null;
    };
