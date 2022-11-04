import { CadastroEstudanteType } from "@/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    cadastroetp1: boolean,
    estudante: CadastroEstudanteType
}

export const counterSlice = createSlice({
    name: 'cadastro',
    initialState: {
        cadastroetp1: false,
        cadastroetp2: false,
        estudante: {}
    } as CounterState,
    reducers: {
        negateCadastroetp1: (state) => {
            state.cadastroetp1 = !state.cadastroetp1
        },
        setState: (state, value) => {
            state.estudante = value.payload
        }
    }
})

export const { negateCadastroetp1, setState } = counterSlice.actions;

export default counterSlice.reducer;