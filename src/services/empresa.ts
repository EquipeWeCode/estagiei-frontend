import { ENDPOINT_EMPRESA } from "@/constants";
import { CadastroEmpresaType } from "@/types/empresaTypes";
import { getResource, postResource, putResource } from "./utils";

export const postEmpresa = async (body: CadastroEmpresaType = {}) => {
	return await postResource(ENDPOINT_EMPRESA, body);
};

export const getEmpresa = async (id: string | number | null  = "") => {
	return await getResource(`${ENDPOINT_EMPRESA}/${id}`);
};

export const putEmpresa = async (id: string | number | undefined = "", body: any = {}) => {
	return await putResource(`${ENDPOINT_EMPRESA}/${id}`, body);
};