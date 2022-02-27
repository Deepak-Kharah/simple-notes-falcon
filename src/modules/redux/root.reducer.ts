import { combineReducers } from "redux";

import authReducer, {
    initialState as authInitialState,
} from "../auth/redux/auth.reducer";

import uiAlertReducer, {
    initialState as uiAlertInitialState,
} from "../ui-message/redux/ui-message.reducer";

export const initialState = {
    auth: authInitialState,
    uiAlert: uiAlertInitialState,
};

export const reducers = {
    auth: authReducer,
    uiAlert: uiAlertReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
