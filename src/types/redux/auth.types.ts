import { authDispatch } from "../../redux/types";

export declare type authDispatchTypes = keyof typeof authDispatch;


export declare interface AuthReducerPayload {
    type: authDispatchTypes;
    payload?: { [key: string]: any } | undefined;
}

export declare interface UserWithoutPasswordDto {
    username: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
}
