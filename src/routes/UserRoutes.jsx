// src/routes/UserRoutes.jsx
import { Route } from "react-router-dom";
import UserList from "../pages/user/UserList";
import CreateUser from "../pages/user/CreateUser";
import EditEmployee from "../pages/user/EditUser";
import SubcategoriesPage from "../pages/SubcategoriesPage";
import CategoryPage from "../pages/CategoryPage";

const userRoutes = [
  <Route key="user-list" path="/users" element={<UserList />} />,
  <Route key="create-user" path="/users/create" element={<CreateUser />} />,
  <Route key="edit-user" path="/users/edit/:id" element={<EditEmployee />} />,
  <Route key="category-list" path="/categories" element={<CategoryPage />} />,
  <Route key="subcategory-list" path="/categories/:categoryId/subcategories" element={<SubcategoriesPage />} />,
];


export default userRoutes;
