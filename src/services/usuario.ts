import { ENDPOINT_USUARIO } from "@/constants";
import { FiltroUsuarioType } from "@/types/userTypes";
import { getResource, serializeObjectToParam } from "./utils";

export const getUsuario = async (id: string = "") => {
	return await getResource(`${ENDPOINT_USUARIO}/${id}`);
};

export const getUsuarios = async (filtro: FiltroUsuarioType) => {
	return await getResource(`${ENDPOINT_USUARIO}${serializeObjectToParam(filtro)}`);
};
