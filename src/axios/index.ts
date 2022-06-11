import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
instance.interceptors.request.use(config => {
  console.log("Request Interceptor", config);
  document.body.classList.add('loading-indicator');
  return config;

}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {

  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance;