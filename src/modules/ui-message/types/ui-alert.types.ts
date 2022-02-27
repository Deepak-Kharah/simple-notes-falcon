import { AlertStatus, useToast, UseToastOptions } from "@chakra-ui/react";
import { uiAlertDispatch } from "../redux/ui-message.dispatch-type";

export declare type uiAlertDispatchTypes = keyof typeof uiAlertDispatch;

export declare interface UiAlertReducerPayload {
    type: uiAlertDispatchTypes;
    payload?: { [key: string]: any } | undefined;
}

export declare interface UiAlertReducerInitialState {
    alerts: UseToastOptions[];
}
