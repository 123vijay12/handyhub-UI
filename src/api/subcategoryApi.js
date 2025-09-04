// src/api/subcategoryApi.js
import axios from "./axiosInstance";

// GET all subcategories by category ID
export const fetchSubcategoriesByCategoryId = (categoryId) => 
  axios.get(`/service-subcategories/category/${categoryId}`);

// POST - create new subcategory
export const createSubcategory = (subcategoryData) => 
  axios.post("/service-subcategories", subcategoryData);

// PUT - update subcategory by ID
export const updateSubcategory = (id, updatedData) => 
  axios.put(`/service-subcategories/${id}`, updatedData);

// DELETE - delete subcategory by ID
export const deleteSubcategory = (id) => 
  axios.delete(`/service-subcategories/${id}`);
