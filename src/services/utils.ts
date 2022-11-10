import axios from '@/axios';

const ROOT_URL = () => {
	return import.meta.env.VITE_SERVER_URL;
};

const CEP_URL = () => {
	return import.meta.env.VITE_CEP_URL;
}

const IBGE_URL = () => {
	return import.meta.env.VITE_IBGE_URL;
}

//Resources
export const getResource = async (resource: string, config: any = null) => {
	const response = await axios.get(ROOT_URL() + resource, config);
	return response;
};

export const getResourceCep = async (resource: string, config: any = null) => {
	const response = await axios.get(CEP_URL() + resource, config);
	return response; 
}

export const getResourceIbge = async (resource: string, config: any = null) => {
	const response = await axios.get(IBGE_URL() + resource, config);
	return response; 
}

export async function postResource(
	resource: string,
	body: object = {},
	config: any = null,
) {
	const response = await axios.post(ROOT_URL() + resource, body, config);
	return response;
}

export async function putResource(resource: string, body: object, config: any = null) {
	const response = await axios.put(ROOT_URL() + resource, body, config);
	return response;
}

export async function deleteResource(resource: string, config: any) {
	const response = await axios.delete(ROOT_URL() + resource, config);
	return response;
}

export async function postCandidaturaResource(
	resource: string,
	config: any = null,
) {
	const response = await axios.post(ROOT_URL() + resource, config);
	return response;
}

export function serializeObjectToParam(filtro: Record<string, any>, first: boolean = false) {
	let params = "";
	let firstParam = "?";
	if (first) {
		firstParam = "";
	}
	for (const key in filtro) {
		if (filtro[key] !== null && filtro[key] !== undefined && filtro[key] !== "") {
			params += firstParam + key + "=" + filtro[key];
			firstParam = "&";
		}
	}
	return params;
}
