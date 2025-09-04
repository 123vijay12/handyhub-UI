import axios from "./axiosInstance";

// GET all users
export const login = (credentials) =>
  axios.post("/auth/login", credentials);
