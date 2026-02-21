// src/routes/UserRoutes.jsx
import { Route } from "react-router-dom";

// USER PAGES
import CreateUser from "../pages/user/CreateUser";
import EditUser from "../pages/user/EditUser";
import EmployeeTabs from "../pages/user/EmployeeTabs";
import EmployeesPage from "../pages/user/EmployeesPage";
import UserBookings from "../pages/user/UserBookings";

// WORKER PAGES
import AddWorker from "../pages/worker/AddWorkerProfile";
import EditWorker from "../pages/worker/EditWorker";
import WorkerProfilePage from "../pages/worker/WorkerProfilePage";
import WorkerJobs from "../pages/worker/WorkerJobs";
import WorkersPage from "../pages/worker/WorkersPage";

// CATEGORY PAGES
import CategoryPage from "../pages/category/CategoryPage";
import SubcategoriesPage from "../pages/category/SubcategoriesPage";
import BrowseCategoriesPage from "../pages/category/BrowseCategoriesPage";
import BrowseSubcategoriesPage from "../pages/category/BrowseSubcategoriesPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import Test from "../pages/Test";


const userRoutes = [
  // ---------------- USER ----------------
  <Route key="employees" path="/handyhub/employees" element={<EmployeesPage />} />,
  <Route key="users" path="/handyhub/users" element={<EmployeeTabs />} />,
  <Route key="user-create" path="/handyhub/users/create" element={<CreateUser />} />,
  <Route key="user-edit" path="/handyhub/users/edit/:id" element={<EditUser />} />,
  <Route key="user-profile" path="/handyhub/profile" element={<UserProfilePage  />} />,
  <Route key="user-bookings" path="/handyhub/my-bookings" element={<UserBookings />} />,

  // ---------------- WORKER ----------------
  <Route key="workers" path="/handyhub/workers" element={<WorkersPage />} />,
  <Route key="worker-add" path="/handyhub/workers/add" element={<AddWorker />} />,
  <Route key="worker-edit" path="/handyhub/workers/edit/:id" element={<EditWorker />} />,
  <Route key="worker-profile" path="/handyhub/workers/profile/:workerId" element={<WorkerProfilePage />} />,
  <Route key="worker-jobs" path="/handyhub/worker/jobs" element={<WorkerJobs />} />,

  // ---------------- CATEGORY ----------------
  <Route key="category-list" path="/handyhub/categories" element={<CategoryPage />} />,
  <Route
    key="subcategory-list"
    path="/handyhub/categories/:categoryId/subcategories"
    element={<SubcategoriesPage />}
  />,

  // ---------------- BROWSE (USER SIDE) ----------------
  <Route
    key="browse-categories"
    path="/handyhub/browse/categories"
    element={<BrowseCategoriesPage />}
  />,
  <Route
    key="browse-subcategories"
    path="/handyhub/browse/categories/:categoryId/subcategories"
    element={<BrowseSubcategoriesPage />}
  />,


    <Route key="worker-test" path="/handyhub/browse/workers" element={<Test />} />,
];

export default userRoutes;
