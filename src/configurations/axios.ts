import axios from "axios";
import { Dispatch } from "redux";
import { authDispatch } from "../redux/types";

export default function configureAxios(dispatch: Dispatch) {
    axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;

    axios.interceptors.response.use(
        (axiosResponse) => {
            return Promise.resolve(axiosResponse);
        },
        (axiosResponse) => {
            const { response, config } = axiosResponse;
            const { baseURL } = config;
            const { data } = response;
            const { message, statusCode } = data;

            if (baseURL !== "http://localhost:8000") {
                return Promise.reject(axiosResponse);
            }

            if (statusCode !== 401) {
                Promise.reject(axiosResponse);
            }

            // handle default auth error
            switch (message.toLowerCase()) {
                case "access token expired":
                case "no access token":
                    dispatch({
                        type: authDispatch.AUTH_ERROR,
                    });
                    break;
                default:
                    return Promise.reject(axiosResponse);
            }

            return Promise.reject(axiosResponse);
        }
    );
}
