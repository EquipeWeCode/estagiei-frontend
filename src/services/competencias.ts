import { ENDPOINT_COMPETENCIA } from "@/constants";
import { getResource } from "./utils";

export const getCompetencias = () => {
	return getResource(ENDPOINT_COMPETENCIA);
};
