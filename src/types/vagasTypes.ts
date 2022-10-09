import { EnderecoType } from './enderecoType';
import { CompetenciaType } from "./competenciaType";
import { EmpresaType } from "./empresaTypes";
import { FilterType } from "./filterTypes";
import { AuditoriaType } from './userTypes';

export interface VagaType {
  codVaga?: number,
	titulo?: string,
	descricao?: string,
  modalidade?: string,
	salario: number,
	indAtivo?: boolean,
  cargaHoraria?: number,
  empresa?: EmpresaType,
  endereco?: EnderecoType,
  competencias?: CompetenciaType[],
  auditoria?: AuditoriaType,
}

export interface FiltroVagaType extends FilterType {
  titulo?: string,
  descricao?: string,
}