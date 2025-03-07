import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api/v1",
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const currency = localStorage.getItem("currency");

  config.headers["X-Preferred-Currency"] = currency;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    error.message = error.response.data.message || error.message;
    return Promise.reject(error);
  }
);

export default api;
