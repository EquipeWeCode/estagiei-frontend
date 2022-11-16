import { ENDPOINT_LOGIN, EXPIRES_IN_KEY } from "@/constants";
import { LoginType } from "@/types/userTypes";
import { TOKEN_KEY, USER_KEY } from "./../constants/index";
import { postResource } from "./utils";
import instance from "../axios";

export const postLogin = (body: LoginType) => {
	return postResource(ENDPOINT_LOGIN, body);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const logout = () => {
	delete instance.defaults.headers.common["Authorization"];
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
	localStorage.removeItem(EXPIRES_IN_KEY);
};
