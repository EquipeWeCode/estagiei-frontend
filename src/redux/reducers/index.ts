import { combineReducers } from '@reduxjs/toolkit'
import { showErrorReducer } from './message';
import cadastroReducer from './cadastro';

export const rootReducer = combineReducers({
  message: showErrorReducer,
  cadastro: cadastroReducer
})

export type RootState = ReturnType<typeof rootReducer>