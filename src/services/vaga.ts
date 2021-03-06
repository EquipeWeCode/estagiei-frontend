import { ENDPOINT_VAGA } from "@/constants";
import { FiltroVagaType } from "@/types/vagasTypes";
import { getResource, serializeObjectToParam } from "./utils";

export const getVagas = (filtro: FiltroVagaType) => {
	return getResource(ENDPOINT_VAGA + serializeObjectToParam(filtro, false), null);
};
