import { ENDPOINT_LOGIN } from "@/constants";
import { postResource, serializeObjectToParam } from "./utils";

export async function postLogin(body: object) {
	return postResource(ENDPOINT_LOGIN, body, null, false);
};
