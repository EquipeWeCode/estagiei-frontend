import { ENDPOINT_STUDENT } from "@/constants";
import { getResource } from "./utils";

export const getStudent = async (id: string) => {
	return await getResource(`${ENDPOINT_STUDENT}/${id}`, null, false);
};
