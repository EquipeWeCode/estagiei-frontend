import { ENDPOINT_ESTUDANTE } from "@/constants";
import { StudentType } from "@/types/studentTypes";
import { getResource, putResource } from "./utils";

export const getEstudante = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}`);
};

export const putEstudante = async (id: string = "", body: StudentType = {}) => {
	return await putResource(`${ENDPOINT_ESTUDANTE}/${id}`, body);
};


export const getVagasRecomendadas = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}/recomendacao`);
};