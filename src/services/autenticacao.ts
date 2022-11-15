import { ENDPOINT_LOGIN } from "@/constants";
import { LoginType } from "@/types/userTypes";
import { TOKEN_KEY, USER_KEY } from "./../constants/index";
import { postResource } from "./utils";

export const postLogin = (body: LoginType) => {
	return postResource(ENDPOINT_LOGIN, body);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const logout = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};
