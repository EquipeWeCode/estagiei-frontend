export type RegiaoType = {
    id: string;
    sigla: string;
    nome: string;
}

export type EstadoType = {
    id: string;
    sigla: string;
    nome: string;
    regiao: RegiaoType;
}