import { CadastroEstudanteType } from "@/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    cadastroetp1: boolean,
    cadastroetp2: boolean,
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
        negateCadastroetp2: (state) => {
            state.cadastroetp2 = !state.cadastroetp2
        },
        setState: (state, value) => {
            state.estudante = value.payload
        }
    }
})

export const { negateCadastroetp1, negateCadastroetp2, setState } = counterSlice.actions;

export default counterSlice.reducer;