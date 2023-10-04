import axios from "axios";
import { overrideHttpType } from "./overrideHttpType";

const _http = axios.create({
  timeout: 1000 * 30,
});

_http.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    throw err;
  }
);

_http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {}
);

export const http = overrideHttpType(_http);
