import { ENDPOINT_VAGA } from "@/constants";
import { FiltroVagaType } from "@/types/vagasTypes";
import { VagaType } from "./../types/vagasTypes";
import { getResource, postResource, putResource, serializeObjectToParam } from "./utils";

export const getVaga = (codVaga: string | number | undefined) => {
	return getResource(`${ENDPOINT_VAGA}/${codVaga}`);
};

export const getVagas = (filtro: FiltroVagaType) => {
	return getResource(ENDPOINT_VAGA + serializeObjectToParam(filtro));
};

export const postVaga = async (body: any = {}) => {
	return await postResource(`${ENDPOINT_VAGA}`, body);
};

export const putVaga = async (id: string | number | undefined = "", body: any = {}) => {
	return await putResource(`${ENDPOINT_VAGA}/${id}`, body);
};
