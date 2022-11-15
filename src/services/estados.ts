import { ENDPOINT_ESTADOS } from "@/constants";
import { getResourceIbge } from "./utils";

export const getEstados = async () => {
	return await getResourceIbge(ENDPOINT_ESTADOS);
};
