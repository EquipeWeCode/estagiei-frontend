import { ENDPOINT_CANDIDATURA } from "@/constants";
import { postCandidaturaResource } from "./utils";

export const postCandidatura = (codEstudante: string = "", codVaga: string | number = "") => {
	return postCandidaturaResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}/${codVaga}`);
};