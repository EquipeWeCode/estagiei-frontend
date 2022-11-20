import { CandidaturaType } from "@/types/candidaturaType";
import { CompetenciaCodType, CompetenciaType } from "./competenciaType";
import { contatosType } from "./contatoType";
import { EnderecoType } from "./enderecoType";
import { experienciaProfissionalType } from "./experienciaProfissionalType";
import { historicoEscolarType } from "./historicoEscolarType";

export interface AuditoriaType {
	dataInclusao?: string;
	dataAlteracao?: string;
}

export type UserType = {
	codEstudante?: string;
	codEmpresa?: string;
	nvlEscolaridade?: string;
	tipoUsuario?: string;
	nomeFantasia?: string;
	razaoSocial?: string;
	cnpj?: string;
	indAtivo?: boolean;
	email?: string;
	avatar?: string;
	cpf?: string;
	rg?: string;
	nome?: string;
	contatos?: ContatoType[];
	instEnsino?: string;
	nvlEnsino?: string;
	experienciaProfissional?: experienciaProfissionalType[];
	dataNascimento?: string;
	historicoEscolar?: historicoEscolarType[];
	competencias?: CompetenciaType[];
	candidaturas?: CandidaturaType[];
	roles?: string[];
	auditoria?: AuditoriaType;
	endereco?: EnderecoType;
};

export type ContatoType = {
	codContato?: string | number;
	tipoContato?: string;
	descContato?: string;
	valorContato?: string;
	auditoria?: AuditoriaType;
};

export type CadastroEstudanteType = {
	email?: string;
	senha?: string;
	nvlEscolaridade?: string;
	cpf?: string;
	rg?: string;
	nome?: string;
	avatar?: string | undefined | null;
	dataNascimento?: string;
	endereco?: EnderecoType;
	experienciaProfissional?: experienciaProfissionalType[];
	competencias?: CompetenciaCodType[];
	historicoEscolar?: historicoEscolarType[];
	contatos?: contatosType[];
};

export type LoginType = {
	email: string;
	senha: string;
};

export type TokenType = {
	accessToken: string;
	tokenType: string;
	roles: string[];
	expiresIn: number;
};

export type FiltroUsuarioType = {
	email?: string;
};
