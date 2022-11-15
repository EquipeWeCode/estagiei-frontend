import { ENDPOINT_ESTADOS, ENDPOINT_REGIAO_IMEDIATA } from "@/constants";
import { getResourceIbge } from "./utils";

export const getCidades = async (id: number) => {
	return await getResourceIbge(`${ENDPOINT_ESTADOS}/${id}/${ENDPOINT_REGIAO_IMEDIATA}/`);
};
