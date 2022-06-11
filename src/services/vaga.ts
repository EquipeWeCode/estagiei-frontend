import { ENDPOINT_VAGA } from "@/constants";
import { getResource, serializeObjectToParam } from "./utils";

export const getVagas = (filtro: object) => {
	return getResource(ENDPOINT_VAGA + serializeObjectToParam(filtro, true), null);
};
