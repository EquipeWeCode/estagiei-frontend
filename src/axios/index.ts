import axios from "axios";
import {store} from "@/redux/store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Interceptors
instance.interceptors.request.use(config => {
  document.body.classList.add('loading-indicator');
  return config;

}, function (error) {
  document.body.classList.remove('loading-indicator');
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {

  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {
  document.body.classList.remove('loading-indicator');
  const response = error.response;
  const errors: [] = response.data.errors ? response.data.errors : [];
  const message = response.data.message ? response.data.message : "";
  store.dispatch({
    type: 'SHOW_ERROR',
    payload: errors.length > 0 ? errors.join('\r\n') : message,
  });
  return Promise.reject(error);
});

export default instance;