import { CompetenciaType } from './competenciaType';
import { FilterType } from './filterTypes';
import { EmpresaType } from './empresaTypes';
import { AuditoriaType } from "./userTypes";

export interface CandidaturaProps {
	candidatura: CandidaturaType;
	fetchCandidatura: () => any;
}

export type CandidaturaType = {
	codEstudante?: string | number;
	codVaga?: string | number;
	nomeEstudante?: string;
	titulo?: string;
	modalidade?: string;
	salario?: number;
	status?: string;
	curso?: string;
	competenciasEstudante?: CompetenciaType[];
	empresa?: EmpresaType;
	auditoria?: AuditoriaType;
};

export interface FiltroCandidaturaType extends FilterType {
	indAtivo?: boolean;
	codEmpresa?: number | string;
	codVaga?: number | string;
	status?: string;
}