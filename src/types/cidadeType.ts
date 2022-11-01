import { EstadoType } from "./estadoType"

export type RegiaoIntermediariaType = {
  id: number;
  nome: string;
  UF: EstadoType;
}

export type cidadeType = {
  id: number;
  nome: string;
  "regiao-intermediaria": RegiaoIntermediariaType;
}