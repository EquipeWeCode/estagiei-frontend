import { ENDPOINT_EMPRESA } from "@/constants";
import { EmpresaType } from "@/types/empresaTypes";
import { getResource, postResource } from "./utils";

export const postEmpresa = async (body: EmpresaType = {}) => {
    return await postResource(ENDPOINT_EMPRESA, body)
}

export const getEmpresa = async (id: string = "") => {
	return await getResource(`${ENDPOINT_EMPRESA}/${id}`);
};
