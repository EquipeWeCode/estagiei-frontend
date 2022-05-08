import Axios from "axios";

// Interceptors
Axios.interceptors.request.use(config => {

    // Add token to headers
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    //add cors to headers

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