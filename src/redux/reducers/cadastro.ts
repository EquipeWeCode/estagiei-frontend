import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'cadastro',
    initialState: {
        cadastroetp1: false,
        cadastroetp2: false
    },
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