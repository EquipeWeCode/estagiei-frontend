export type EmpresaType = {
  codEmpresa?: number,
  razaoSocial?: string,
  nomeFantasia?: string,
  cnpj?: string,
  indAtivo?: boolean,
}

export type EmpresaLoginType = {
  email: string,
  senha: string,
}