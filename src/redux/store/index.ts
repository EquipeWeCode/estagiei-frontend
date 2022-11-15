import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import { rootReducer } from "../reducers";

export const store: Store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
