import { URL_LOCALHOST, ENDP_VAGA } from "../../constants";
import { getResource } from "../../axios";

export const getVaga = (config) => {
    return getResource(`${URL_LOCALHOST}${ENDP_VAGA}`, config);
}