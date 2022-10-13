import { ENDPOINT_EMPRESA } from "@/constants";
import { CadastroEmpresaType, EmpresaType } from "@/types/empresaTypes";
import { getResource, postResource } from "./utils";

export const postEmpresa = async (body: CadastroEmpresaType = {}) => {
    return await postResource(ENDPOINT_EMPRESA, body)
}

export const getEmpresa = async (id: string = "") => {
	return await getResource(`${ENDPOINT_EMPRESA}/${id}`);
};
