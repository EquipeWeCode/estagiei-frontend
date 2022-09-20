import { CompetenciaType } from "./competenciaType";
import { EmpresaType } from "./empresaTypes";

export type VagaType = {
  codVaga?: number;
	titulo?: string;
	descricao?: string;
	salario: number;
	indAtivo?: boolean;
  empresa?: EmpresaType;
  competencias?: CompetenciaType[];
}

export type FiltroVagaType = {
  titulo?: string;
  descricao?: string;
}