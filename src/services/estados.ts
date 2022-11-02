import { ENDPOINT_ESTADOS } from "@/constants";
import { getResource, getResourceIbge, postResource } from "./utils";

export const getEstados = async () => {
    return await getResourceIbge(ENDPOINT_ESTADOS);
}
