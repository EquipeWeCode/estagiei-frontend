import { combineReducers } from '@reduxjs/toolkit'
import { showErrorReducer } from './message'

export const rootReducer = combineReducers({
  message: showErrorReducer,
})

export type RootState = ReturnType<typeof rootReducer>