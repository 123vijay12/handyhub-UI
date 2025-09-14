// src/api/roleApi.js
import axios from "./axiosInstance";

export const fetchRoles = () => axios.get("/roles");
