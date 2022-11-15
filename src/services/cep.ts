import { ENDPOINT_CEP } from "@/constants";
import { getResourceCep } from "./utils";

export const getCep = async (cep: string = "") => {
	return await getResourceCep("/" + cep + ENDPOINT_CEP);
};
