import { ENDPOINT_ESTUDANTE } from "@/constants";
import { StudentType } from "@/types/userTypes";
import { getResource, putResource } from "./utils";

export const getEstudante = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}`, null);
};

export const putEstudante = async (id: string = "", body: StudentType = {}) => {
	return await putResource(`${ENDPOINT_ESTUDANTE}/${id}`, body, null);
};


export const getVagasRecomendadas = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}/recomendacao`, null);
};