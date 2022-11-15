export type RegiaoType = {
	id: number;
	sigla: string;
	nome: string;
};

export type EstadoType = {
	id: number;
	sigla: string;
	nome: string;
	regiao: RegiaoType;
};
