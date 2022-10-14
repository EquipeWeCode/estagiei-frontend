import { EnderecoType } from "./enderecoType"

export type experienciaProfissionalType = {
    nomeEmpresa?: string,
    cargo?: string,
    descricao?: string,
    dataInicio?: string,
    dataFim?: string,
    endereco: EnderecoType
}