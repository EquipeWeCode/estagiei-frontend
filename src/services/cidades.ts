import { ENDPOINT_REGIAO_IMEDIATA, ENDPOINT_ESTADOS } from "@/constants";
import { getResource, postResource } from "./utils";

export const getCidades = async (id: number) => {
    return await getResource(`${ENDPOINT_ESTADOS}/${id}/${ENDPOINT_REGIAO_IMEDIATA}/`);
}
