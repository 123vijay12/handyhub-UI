// src/api/auth.js
import axios from "../api/axiosInstance";

export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data; // ✅ RETURN DATA ONLY
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/handyhub/login";
};

export const getToken = () => localStorage.getItem("token");
