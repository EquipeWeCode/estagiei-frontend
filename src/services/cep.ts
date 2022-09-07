import { ENDPOINT_CEP } from "@/constants";
import { getResource, getResourceCep } from "./utils";

export const getCep = (cep: string = "") => {
    return getResourceCep("/" + cep + ENDPOINT_CEP);
}