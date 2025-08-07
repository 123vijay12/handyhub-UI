// src/api/userApi.js
import axios from "./axiosInstance";

// GET all users
export const fetchUsers = () => axios.get("/users");

// POST - create new user
export const createUser = (userData) => axios.post("/users", userData);

// GET - user by ID
export const getUserById = (id) => axios.get(`/users/${id}`);

// ✅ PUT - update user by ID
export const updateUser = (id, updatedData) => axios.put(`/users/${id}`, updatedData);

// DELETE - delete user by ID
export const deleteUser = (id) => axios.delete(`/users/${id}`);
