import { ENDPOINT_CANDIDATURA } from "@/constants";
import { postCandidaturaResource } from "./utils";

export const postCandidatura = (codEstudante: string = "", codVaga: string = "") => {
	return postCandidaturaResource(`${ENDPOINT_CANDIDATURA}/${codEstudante}/${codVaga}`);
};