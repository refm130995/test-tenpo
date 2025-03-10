import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.unsplash.com";
const CLIENT_ID = import.meta.env.VITE_API_CLIENT_ID;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Client-ID ${CLIENT_ID}`;
    return config;
  },
  (error) => Promise.reject(new Error(error.message || error))
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(new Error(error.response?.data || error.message));
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error("Límite de solicitudes alcanzado. Inténtalo más tarde.");
    } else {
      console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(new Error(error.response?.data || error.message));
  }
);

export default api;
