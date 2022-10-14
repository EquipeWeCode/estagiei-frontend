import { ENDPOINT_ESTUDANTE } from "@/constants";
import { UserType } from "@/types/userTypes";
import { getResource, postResource, putResource } from "./utils";

export const getEstudante = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}`);
};

export const putEstudante = async (id: string = "", body: UserType = {}) => {
	return await putResource(`${ENDPOINT_ESTUDANTE}/${id}`, body);
};

export const postEstudante = async (body: UserType = {}) => {
	return await postResource(ENDPOINT_ESTUDANTE, body)
}

export const getVagasRecomendadas = async (id: string = "") => {
	return await getResource(`${ENDPOINT_ESTUDANTE}/${id}/recomendacao`);
};