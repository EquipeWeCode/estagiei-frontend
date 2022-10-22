import { AuditoriaType } from "./userTypes";
export type CandidaturaType = {
	codEstudante?: string | number;
	codVaga?: string | number;
	nomeEstudante?: string;
	titulo?: string;
	curso?: string;
	auditoria?: AuditoriaType;
};
