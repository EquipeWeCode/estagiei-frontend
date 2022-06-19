import { AppDispatch } from "../store";

export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_MESSAGE = "HIDE_MESSAGE";

interface ShowErrorAction {
	type: typeof SHOW_ERROR | typeof HIDE_MESSAGE;
	payload: string;
}

export const showErrorReducer = (state = "", action: ShowErrorAction) => {
	switch (action.type) {
		case "SHOW_ERROR":
			return {
				visible: true,
				message: action.payload,
			};
		case "HIDE_MESSAGE":
			return {
				visible: false,
				message: "",
			};
		default:
			return state;
	}
};

export function showError(message: string) {
	return {
		type: SHOW_ERROR,
		payload: message,
	};
}
