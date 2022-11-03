export const statusCandidaturaEnum = new Map();
statusCandidaturaEnum.set("CANDIDATADO", "Candidatado(a)");
statusCandidaturaEnum.set("CANCELADO", "Cancelada");
statusCandidaturaEnum.set("APROVADO", "Aprovado(a)");
statusCandidaturaEnum.set("REPROVADO", "Reprovado(a)");
statusCandidaturaEnum.set("FINALIZADO", "Finalizada");

export const statusHistoricoEscolarEnum = new Map();
statusHistoricoEscolarEnum.set("CONCLUIDO", "Concluido");
statusHistoricoEscolarEnum.set("CURSANDO", "Cursando");

export const tipoContatoEnum = new Map();
tipoContatoEnum.set("CELULAR", "Celular");
tipoContatoEnum.set("EMAIL", "Email");
tipoContatoEnum.set("TEL_FIXO", "Fixo");

export const nivelEscolaridadeEnum = new Map();
nivelEscolaridadeEnum.set("TECNICO", "Tecnico");
nivelEscolaridadeEnum.set("MEDIO", "Medio");
nivelEscolaridadeEnum.set("FUNDAMENTAL", "Fundamental");
nivelEscolaridadeEnum.set("SUPERIOR", "Superior");

export const [CANDIDATADO, CANCELADO, APROVADO, REPROVADO, FINALIZADO] = statusCandidaturaEnum.keys();
export const [CONCLUIDO, CURSANDO] = statusHistoricoEscolarEnum.keys();
export const [CELULAR, EMAIL, TEL_FIXO] = tipoContatoEnum.keys();
export const [TECNICO, MEDIO, FUNDAMENTAL, SUPERIOR] = nivelEscolaridadeEnum.keys();
