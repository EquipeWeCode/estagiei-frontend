export const statusCandidaturaEnum = new Map();
statusCandidaturaEnum.set("CANDIDATADO", "Candidatado(a)");
statusCandidaturaEnum.set("CANCELADO", "Cancelada");
statusCandidaturaEnum.set("APROVADO", "Aprovado(a)");
statusCandidaturaEnum.set("REPROVADO", "Reprovado(a)");
statusCandidaturaEnum.set("FINALIZADO", "Finalizada");
statusCandidaturaEnum.set("CANCELADO_ESTUDANTE", "Cancelada por Candidato(a)");
statusCandidaturaEnum.set("DESATIVADO", "Desativada");

export const [
	CANDIDATADO,
	CANCELADO,
	APROVADO,
	REPROVADO,
	FINALIZADO,
	CANCELADO_ESTUDANTE,
	DESATIVADO,
] = statusCandidaturaEnum.keys();

export const modalidadeEnum = new Map();
modalidadeEnum.set("PRESENCIAL", "Presencial");
modalidadeEnum.set("REMOTO", "Remoto");
modalidadeEnum.set("HIBRIDO", "Híbrido");

export const [PRESENCIAL, REMOTO, HIBRIDO] = modalidadeEnum.keys();

export const nvlEscolaridadeEnum = new Map();
nvlEscolaridadeEnum.set("SEM_INSTRUCAO", "Sem instrução");
nvlEscolaridadeEnum.set("FUNDAMENTAL_INCOMPLETO", "Fundamental incompleto");
nvlEscolaridadeEnum.set("FUNDAMENTAL_COMPLETO", "Fundamental completo");
nvlEscolaridadeEnum.set("MEDIO_INCOMPLETO", "Médio incompleto");
nvlEscolaridadeEnum.set("MEDIO_COMPLETO", "Médio completo");
nvlEscolaridadeEnum.set("SUPERIOR_INCOMPLETO", "Superior incompleto");
nvlEscolaridadeEnum.set("SUPERIOR_COMPLETO", "Superior completo");

export const [
	SEM_INSTRUCAO,
	FUNDAMENTAL_INCOMPLETO,
	FUNDAMENTAL_COMPLETO,
	MEDIO_INCOMPLETO,
	MEDIO_COMPLETO,
	SUPERIOR_INCOMPLETO,
	SUPERIOR_COMPLETO,
] = nvlEscolaridadeEnum.keys();

export const tipoContatoEnum = new Map();
tipoContatoEnum.set("TEL_FIXO", "Telefone fixo");
tipoContatoEnum.set("CELULAR", "Celular");
tipoContatoEnum.set("EMAIL", "E-mail");

export const [TEL_FIXO, CELULAR, EMAIL] = tipoContatoEnum.keys();

export const statusHistEscolarEnum = new Map();
statusHistEscolarEnum.set("CONCLUIDO", "Concluído");
statusHistEscolarEnum.set("CURSANDO", "Cursando");
statusHistEscolarEnum.set("TRANCADO", "Trancado");
statusHistEscolarEnum.set("DESISTIDO", "Desistido");
export const [CONCLUIDO, CURSANDO, TRANCADO, DESISTIDO] = statusHistEscolarEnum.keys();
