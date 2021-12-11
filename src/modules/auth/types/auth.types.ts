import { authDispatch } from "../redux/auth.dispatch-type";

export declare type authDispatchTypes = keyof typeof authDispatch;

export declare interface AuthReducerPayload {
    type: authDispatchTypes;
    payload?: { [key: string]: any } | undefined;
}
