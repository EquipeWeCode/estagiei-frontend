import { ENDPOINT_TOKEN } from "@/constants";
import { getResource } from "./utils";

export const verificaToken = async () => {
	return getResource(`${ENDPOINT_TOKEN}`);
};