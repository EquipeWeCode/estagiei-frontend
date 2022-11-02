import { ENDPOINT_REGIAO_IMEDIATA, ENDPOINT_ESTADOS } from "@/constants";
import { EstadoType } from "@/types/estadoType";
import { getResource, getResourceIbge, postResource } from "./utils";

export const getCidades = async (id: number) => {
    return await getResourceIbge(`${ENDPOINT_ESTADOS}/${id}/${ENDPOINT_REGIAO_IMEDIATA}/`);
}
