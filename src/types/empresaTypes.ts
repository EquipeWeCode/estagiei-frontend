import { EnderecoType } from "./enderecoType";
import { VagaType } from "./vagasTypes";

export type EmpresaType = {
  codEmpresa?: number;
  email?: string;
  senha?: string;
  avatar?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  endereco?: EnderecoType;
  vagas?: VagaType[];
  indAtivo?: boolean;
}

export type EmpresaLoginType = {
  email: string;
  senha: string;
}