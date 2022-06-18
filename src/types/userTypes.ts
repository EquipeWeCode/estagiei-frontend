import { CompetenciaType } from "./competenciaType";

export interface UserGoogleRequest {
  token: string;
}

export type UserGoogleType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

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
  competencias?: CompetenciaType[];
}