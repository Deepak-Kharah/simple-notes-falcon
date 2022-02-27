import { UseToastOptions } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import {
    UiAlertReducerInitialState,
    UiAlertReducerPayload,
} from "../types/ui-alert.types";
import { uiAlertDispatch } from "./ui-message.dispatch-type";

export const initialState: UiAlertReducerInitialState = {
    alerts: [],
};

function uiAlert(
    state = initialState,
    action: UiAlertReducerPayload
): typeof initialState {
    switch (action.type) {
        case uiAlertDispatch.UI_ALERT_ADD:
            const { alert = null } = action.payload || {};
            if (alert) {
                return {
                    alerts: [
                        ...state.alerts,
                        {
                            ...alert,
                            id: uuidv4(),
                        } as UseToastOptions,
                    ],
                };
            }
            return state;

        case uiAlertDispatch.UI_ALERT_REMOVE:
            const { alertIds = [] } = action.payload || {};
            const filteredAlerts = state.alerts.filter((alert) => {
                return !alertIds.includes(alert.id);
            });

            return {
                alerts: filteredAlerts,
            };

        default:
            return state;
    }
}

export default uiAlert;
