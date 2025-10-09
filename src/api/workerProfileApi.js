// src/api/workerProfileApi.js
import axios from "./axiosInstance"; // make sure you have axiosInstance configured

// GET all worker profiles
export const fetchWorkerProfiles = () => axios.get("/worker-profiles");

// GET single worker profile by ID
export const getWorkerProfileById = (id) => axios.get(`/worker-profiles/${id}`);

export const getWorkerProfileBycategory = (id) => axios.get(`/worker-profiles/category/${id}`);

export const getWorkerProfileBySubcategory = (id) => axios.get(`/worker-profiles/subcategory/${id}`);


// POST - create new worker profile
export const createWorkerProfile = (profileData) =>
  axios.post("/worker-profiles", profileData);

// PUT - update worker profile by ID
export const updateWorkerProfile = (id, updatedData) =>
  axios.put(`/worker-profiles/${id}`, updatedData);

// DELETE - delete worker profile by ID
export const deleteWorkerProfile = (id) =>
  axios.delete(`/worker-profiles/${id}`);
