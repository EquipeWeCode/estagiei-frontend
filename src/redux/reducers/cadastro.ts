import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    cadastroetp1: boolean,
    cadastroetp2: boolean
}

const initialState: CounterState = {
    cadastroetp1: false,
    cadastroetp2: false
}

export const counterSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        negateCadastroetp1: (state) => {
            state.cadastroetp1 = !state.cadastroetp1
        },
        negateCadastroetp2: (state) => {
            state.cadastroetp2 = !state.cadastroetp2
        }
    }
})

export const { negateCadastroetp1, negateCadastroetp2 } = counterSlice.actions;

export default counterSlice.reducer;