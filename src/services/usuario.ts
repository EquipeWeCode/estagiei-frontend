import { ENDPOINT_USUARIO } from "@/constants";
import { FiltroUsuarioType } from "@/types/userTypes";
import { getResource, serializeObjectToParam } from "./utils";

export const getUsuario = (id: string = "") => {
	return getResource(`${ENDPOINT_USUARIO}/${id}`);
};

export const getUsuarios = (filtro: FiltroUsuarioType) => {
	return getResource(`${ENDPOINT_USUARIO}${serializeObjectToParam(filtro)}`);
};
