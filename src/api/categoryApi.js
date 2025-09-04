import axios from "./axiosInstance";

// GET all categories
export const fetchCategories = () => axios.get("/categories");

// POST - create new category
export const createCategory = (categoryData) => axios.post("/categories", categoryData);

// GET - category by ID
export const getCategoryById = (id) => axios.get(`/categories/${id}`);

// PUT - update category by ID
export const updateCategory = (id, updatedData) => axios.put(`/categories/${id}`, updatedData);

// DELETE - delete category by ID
export const deleteCategory = (id) => axios.delete(`/categories/${id}`);
