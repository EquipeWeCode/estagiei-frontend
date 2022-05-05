import { ENDPOINT_VACANCY } from "@/constants";
import { getResource, serializeObjectToParam } from "./utils";

export const getJobsVacancy = (filtro: object) => {
	return getResource(ENDPOINT_VACANCY + serializeObjectToParam(filtro, true), null, true);
};
