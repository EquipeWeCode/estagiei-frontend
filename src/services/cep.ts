import { ENDPOINT_CEP } from "@/constants";
import { getResource, getResourceCep } from "./utils";

export const getCep = async (cep: string = "") => {
    return await getResourceCep("/" + cep + ENDPOINT_CEP);
}