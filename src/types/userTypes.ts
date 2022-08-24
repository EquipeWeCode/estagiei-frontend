import { CompetenciaType } from "./competenciaType";

export type StudentType = {
  codEstudante?: string;
  email?: string;
  avatar?: string;
  cpf?: string;
  rg?: string;
  nome?: string;
  instEnsino?: string;
  nvlEnsino?: string;
  expProfissional?: string;
  dataNascimento?: string;
  competencias?: CompetenciaType[];
}

export type LoginType = {
  email: string,
  senha: string,
}