import { refreshTokenSetup } from "@/utils/refreshToken";
import Axios, { AxiosInstance } from "axios";
import { postLogin } from "./loginGoogle";

const ROOT_URL = () => {
	console.log(import.meta.env.VITE_SERVER_URL);
	return import.meta.env.VITE_SERVER_URL;
};

const getAxiosInstance = (newInstance: any) => {
	let axiosInstance: AxiosInstance = Axios;
	if (newInstance) {
		axiosInstance = Axios.create();
	}
	return axiosInstance;
};

//resources
export const getResource = async (resource: string, config: any, newInstance: boolean) => {
	const response = await getAxiosInstance(newInstance).get(ROOT_URL() + resource, config);
	return response;
};

export async function postResource(
	resource: string,
	body: object,
	config: any,
	newInstance: boolean
) {
	const response = await getAxiosInstance(newInstance).post(ROOT_URL() + resource, body, config);
	return response;
}

export async function putResource(
	resource: string,
	body: object,
	config: any,
	newInstance: boolean
) {
	const response = await getAxiosInstance(newInstance).put(ROOT_URL() + resource, body, config);
	return response;
}

export async function deleteResource(resource: string, config: any, newInstance: boolean) {
	const response = await getAxiosInstance(newInstance).delete(ROOT_URL() + resource, config);
	return response;
}

export function serializeObjectToParam(filtro: Record<string, any>, first: boolean) {
	let params = "";
	let firstParam = "?";
	if (first) {
		firstParam = "";
	}
	for (const key in filtro) {
		if (filtro[key] !== null && filtro[key] !== undefined) {
			params += firstParam + key + "=" + filtro[key];
			firstParam = "&";
		}
	}
	return params;
}
