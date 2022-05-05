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
  nome?: string;
  cpf?: string;
  instituicaoEnsino?: string;
  nivelEscolaridade?: string;
  experienciaProfissional?: string;
}