export type EmpresaType = {
  codEmpresa?: number,
  avatar?: string,
  razaoSocial?: string,
  nomeFantasia?: string,
  cnpj?: string,
  indAtivo?: boolean,
}

export type EmpresaLoginType = {
  email: string,
  senha: string,
}