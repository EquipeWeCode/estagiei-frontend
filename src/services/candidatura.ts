import { ENDPOINT_CANDIDATURA } from "@/constants";
import { CandidaturaType } from "@/types/candidaturaType";
import { postResource } from "./utils";

export const postCandidatura = (params: CandidaturaType) => {
	return postResource(ENDPOINT_CANDIDATURA, params);
};