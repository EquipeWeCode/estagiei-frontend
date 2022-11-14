import { EnderecoType } from "./enderecoType";
import { VagaType } from "./vagasTypes";

export type EmpresaType = {
  codEmpresa?: number,
  razaoSocial?: string,
  avatar?: string,
  nomeFantasia?: string,
  cnpj?: string,
  endereco?: EnderecoType,
  indAtivo?: boolean,
}

export type CadastroEmpresaType = {
  email?: string,
	senha?: string,
	avatar?: string | null,
	razaoSocial?: string,
	nomeFantasia?: string,
	cnpj?: string,
	endereco?: EnderecoType
}

export type EmpresaLoginType = {
  email: string;
  senha: string;
}