import { combineReducers } from "@reduxjs/toolkit";
import cadastroReducer from "./cadastro";
import { showErrorReducer } from "./message";

export const rootReducer = combineReducers({
	message: showErrorReducer,
	cadastro: cadastroReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
