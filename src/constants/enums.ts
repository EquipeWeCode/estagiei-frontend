export const statusCandidaturaEnum = new Map();
statusCandidaturaEnum.set("CANDIDATADO", "Candidatado(a)");
statusCandidaturaEnum.set("CANCELADO", "Cancelada");
statusCandidaturaEnum.set("APROVADO", "Aprovado(a)");
statusCandidaturaEnum.set("REPROVADO", "Reprovado(a)");
statusCandidaturaEnum.set("FINALIZADO", "Finalizada");

export const [CANDIDATADO, CANCELADO, APROVADO, REPROVADO, FINALIZADO] = statusCandidaturaEnum.keys();

export const modalidadeEnum = new Map();
modalidadeEnum.set("PRESENCIAL", "Presencial");
modalidadeEnum.set("REMOTO", "Remoto");
modalidadeEnum.set("HIBRIDO", "Híbrido");

export const [PRESENCIAL, REMOTO, HIBRIDO] = modalidadeEnum.keys();