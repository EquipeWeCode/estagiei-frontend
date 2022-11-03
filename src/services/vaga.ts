import { ENDPOINT_VAGA } from "@/constants";
import { FiltroVagaType } from "@/types/vagasTypes";
import { getResource, serializeObjectToParam } from "./utils";

export const getVaga = (codVaga: string | number | undefined) => {
	return getResource(`${ENDPOINT_VAGA}/${codVaga}`);
};

export const getVagas = (filtro: FiltroVagaType) => {
	return getResource(ENDPOINT_VAGA + serializeObjectToParam(filtro));
};
