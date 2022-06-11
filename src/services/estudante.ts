import { ENDPOINT_ESTUDANTE } from "@/constants";
import { getResource } from "./utils";

export const getEstudante = async (id: string) => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}`, null);
};
