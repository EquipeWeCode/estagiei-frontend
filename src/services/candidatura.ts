import { ENDPOINT_CANDIDATURA } from "@/constants";
import { getResource, postResource } from "./utils";

export const getCandidaturas = (codEstudante: string | number = "") => {
	return getResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}`);
};

export const postCandidatura = (codEstudante: string = "", codVaga: string | number = "") => {
	return postResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}/${codVaga}`);
};