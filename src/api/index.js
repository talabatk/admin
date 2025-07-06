import axios from "axios";
const baseURL = "http://localhost:5000/";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
