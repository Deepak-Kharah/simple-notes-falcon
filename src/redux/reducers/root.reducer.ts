import { combineReducers } from "redux";

import authReducer, { initialState as authInitialState } from "./auth.reducer";

export const initialState = {
    auth: authInitialState,
};

export const reducers = {
    auth: authReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
