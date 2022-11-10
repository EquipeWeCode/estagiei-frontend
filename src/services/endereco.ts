import axios from "axios";

export const getCEP = async (cep: string | undefined) => {
	const cepFormatado = cep?.replace(/[^0-9]/g, "")?.trim();
	return axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`);
};

export const getCidades = async (uf: string | undefined) => {
	return axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
};
