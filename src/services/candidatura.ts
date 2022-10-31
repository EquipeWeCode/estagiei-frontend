import { CandidaturaType, FiltroCandidaturaType } from "@/types/candidaturaType";
import { ENDPOINT_CANDIDATURA } from "@/constants";
import { getResource, postResource, putResource, serializeObjectToParam } from "./utils";

export const getCandidaturas = (
	codEstudante: string | number = "",
	filtro: FiltroCandidaturaType = {}
) => {
	return getResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}${serializeObjectToParam(filtro)}`);
};

export const postCandidatura = (codEstudante: string = "", codVaga: string | number = "") => {
	return postResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}/${codVaga}`);
};

export const putCandidatura = (body: CandidaturaType = {}) => {
	return putResource(`${ENDPOINT_CANDIDATURA}`, body);
};