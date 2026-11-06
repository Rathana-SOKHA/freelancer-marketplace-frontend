import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Crucial: enables sending and receiving cookies with requests
});

// Response interceptor: automatically handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // When cookie expires or is invalid, backend returns 401
    return Promise.reject(error);
  }
);

export default api;
