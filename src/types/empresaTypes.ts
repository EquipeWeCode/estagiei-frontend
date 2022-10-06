import { EnderecoType } from "./enderecoType";
import { VagaType } from "./vagasTypes";

export type EmpresaType = {
  codEmpresa?: number,
  razaoSocial?: string,
  avatar?: string,
  nomeFantasia?: string,
  cnpj?: string,
  indAtivo?: boolean,
}

export type EmpresaLoginType = {
  email: string;
  senha: string;
}