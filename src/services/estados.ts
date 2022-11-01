import { ENDPOINT_ESTADOS } from "@/constants";
import { getResource, postResource } from "./utils";

export const getEstados = async () => {
    return await getResource(ENDPOINT_ESTADOS);
}