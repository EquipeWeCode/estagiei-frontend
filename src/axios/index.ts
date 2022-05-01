import Axios from "axios";

// Interceptors
Axios.interceptors.request.use(config => {

  document.body.classList.add('loading-indicator');
  return config;

}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(response => {

  document.body.classList.remove('loading-indicator');

  return response;
}, function (error) {
  return Promise.reject(error);
});