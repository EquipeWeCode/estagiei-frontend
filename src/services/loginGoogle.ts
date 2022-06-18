import { ENDPOINT_LOGIN } from "@/constants";
import { postResource } from "./utils";

export async function postLogin(body: object) {
	return postResource(ENDPOINT_LOGIN, body, null);
};
