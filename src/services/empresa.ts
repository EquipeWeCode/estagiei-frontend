import { ENDPOINT_EMPRESA } from "@/constants";
import { getResource } from "./utils";

export const getEmpresa = async (id: string = "") => {
	return await getResource(`${ENDPOINT_EMPRESA}/${id}`);
};