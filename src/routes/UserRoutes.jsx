// src/routes/UserRoutes.jsx
import { Route } from "react-router-dom";
import CreateUser from "../pages/user/CreateUser";
import EditEmployee from "../pages/user/EditUser";
import EmployeeTabs from "../pages/user/EmployeeTabs";
import AddWorker from "../pages/worker/AddWorkerProfile";
import CategoryPage from "../pages/category/CategoryPage";
import SubcategoriesPage from "../pages/category/SubcategoriesPage";
import EditWorker from "../pages/worker/EditWorker";
import BrowseCategoriesPage from "../pages/category/BrowseCategoriesPage";
import BrowseSubcategoriesPage from "../pages/category/BrowseSubcategoriesPage";
import WorkerProfilePage from "../pages/worker/WorkerProfilePage";
import WorkerJobs from "../pages/worker/WorkerJobs";
import UserBookings from "../pages/user/UserBookings";

const userRoutes = [
  <Route key="user-list" path="/users" element={<EmployeeTabs />} />,
  <Route path="/employees/add" element={<EmployeeTabs />} />,
  <Route path="/workers/edit/:id" element={<EditWorker />} />,
  <Route key="create-user" path="/users/create" element={<CreateUser />} />,
  <Route key="edit-user" path="/users/edit/:id" element={<EditEmployee />} />,
  <Route key="category-list" path="/categories" element={<CategoryPage />} />,
  <Route path="/workers/add" element={<AddWorker />} />,
  <Route key="subcategory-list" path="/categories/:categoryId/subcategories" element={<SubcategoriesPage />} />,
  <Route path="/browse/categories" element={<BrowseCategoriesPage />} />,
  <Route path="/worker-profile/:workerId" element={<WorkerProfilePage />} />,
    <Route key="user-bookings" path="/my-bookings" element={<UserBookings />} />,
  <Route key="worker-jobs" path="/worker/jobs" element={<WorkerJobs />} />,
  <Route path="/browse/categories/:categoryId/subcategories" element={<BrowseSubcategoriesPage />} />
];


export default userRoutes;
