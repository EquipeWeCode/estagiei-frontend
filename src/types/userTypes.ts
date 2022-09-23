import { CompetenciaType } from "./competenciaType";

export type UserType = {
  codEstudante?: string;
  codEmpresa?: string;
  tipoUsuario?: string;
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
  roles?: string[];
}

export type LoginType = {
  email: string,
  senha: string,
}

export type TokenType = {
  accessToken: string,
  tokenType: string,
  roles: string[],
  expiresIn: number,
}