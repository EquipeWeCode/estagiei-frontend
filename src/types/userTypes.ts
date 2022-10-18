import { CompetenciaCodType, CompetenciaType } from "./competenciaType";
import { contatosType } from "./contatoType";
import { EnderecoType } from "./enderecoType";
import { experienciaProfissionalType } from "./experienciaProfissionalType";
import { historicoEscolarType } from "./historicoEscolarType";

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

export type CadastroEstudanteType = {
  email?: string;
  senha?: string;
	nvlEscolaridade?: string;
  cpf?: string;
  rg?: string;
  nome?: string;
  avatar?: string;
  dataNascimento?: string;
  endereco?: EnderecoType;
  experienciaProfissional?: experienciaProfissionalType[];
  competencias?: CompetenciaCodType[],
  historicoEscolar?: historicoEscolarType[];
  contatos?: contatosType[]
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