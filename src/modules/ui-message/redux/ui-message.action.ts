import { UseToastOptions } from "@chakra-ui/react";
import { Dispatch } from "../../redux/store";
import { uiAlertDispatch } from "./ui-message.dispatch-type";

export const addUiAlert = (alert: UseToastOptions) => (dispatch: Dispatch) => {
    dispatch({
        type: uiAlertDispatch.UI_ALERT_ADD,
        payload: {
            alert: alert,
        },
    });
};

export const removeUiAlert = (alertIds: string[]) => (dispatch: Dispatch) => {
    dispatch({
        type: uiAlertDispatch.UI_ALERT_REMOVE,
        payload: {
            alertIds: alertIds,
        },
    });
};
