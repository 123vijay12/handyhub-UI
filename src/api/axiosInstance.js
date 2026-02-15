// src/api/axiosInstance.js
import axios from "axios";

// Create axios instance
const instance = axios.create({
 // baseURL: "http://localhost:8080/v1", // include /v1 here to simplify endpoints
  baseURL: "http://147.93.98.194:8080/worker/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 / 403 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.clear(); // clear auth info
      window.location.href = "/handyhub/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
