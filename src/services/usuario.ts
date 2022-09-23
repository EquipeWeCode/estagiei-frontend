import { ENDPOINT_USUARIO } from "@/constants";
import { getResource } from "./utils";

export const getUsuario = async (id: string = "") => {
	return await getResource(`${ENDPOINT_USUARIO}/${id}`);
};