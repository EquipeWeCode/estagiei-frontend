export const statusCandidaturaEnum = new Map();
statusCandidaturaEnum.set("CANDIDATADO", "Candidatado(a)");
statusCandidaturaEnum.set("CANCELADO", "Cancelada");
statusCandidaturaEnum.set("APROVADO", "Aprovado(a)");
statusCandidaturaEnum.set("REPROVADO", "Reprovado(a)");
statusCandidaturaEnum.set("FINALIZADO", "Finalizada");
statusCandidaturaEnum.set("CANCELADO_ESTUDANTE", "Cancelada por Candidato(a)");
statusCandidaturaEnum.set("DESATIVADO", "Desativada");

export const [CANDIDATADO, CANCELADO, APROVADO, REPROVADO, FINALIZADO, CANCELADO_ESTUDANTE, DESATIVADO] =
	statusCandidaturaEnum.keys();

export const modalidadeEnum = new Map();
modalidadeEnum.set("PRESENCIAL", "Presencial");
modalidadeEnum.set("REMOTO", "Remoto");
modalidadeEnum.set("HIBRIDO", "Híbrido");

export const [PRESENCIAL, REMOTO, HIBRIDO] = modalidadeEnum.keys();
