import { getToken, logout } from "./../services/autenticacao";
import axios from "axios";
import { store } from "@/redux/store";
import history from "@/utils/history";

const instance = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
});

// Interceptors
instance.interceptors.request.use(
	async config => {
		document.body.classList.add("loading-indicator");
		const token = getToken();

		if (token) {
			config.headers!.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		document.body.classList.remove("loading-indicator");

		if (error.response.status === 401) {
			logout();
			history.push("/login?expired=true");
		}
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	response => {
		document.body.classList.remove("loading-indicator");

		return response;
	},
	function (error) {
		document.body.classList.remove("loading-indicator");
		const response = error?.response;
		const errors: [] = response?.data?.errors || [];
		const message = response?.data?.message || "";

		store.dispatch({
			type: "SHOW_ERROR",
			payload: errors?.length > 0 ? `${errors}` : message,
		});
		return Promise.reject(error);
	}
);

export default instance;
