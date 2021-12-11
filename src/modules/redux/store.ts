import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./root.reducer";
import { configureStore } from "@reduxjs/toolkit";

const middleware = [thunk];

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const makeStore = () => createStore(rootReducer, enhancer);

const store = makeStore();

const a = store.dispatch;

export declare type Store = typeof store;
export declare type State = ReturnType<typeof rootReducer>;
export declare type Dispatch = typeof store.dispatch;

export const reduxWrapper = createWrapper<Store>(makeStore);
