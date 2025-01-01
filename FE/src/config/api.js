import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
