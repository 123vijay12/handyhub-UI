import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../Layout/MainLayout";
import userRoutes from "./UserRoutes";
import Login from "../pages/auth/Login";
import PrivateRoute from "./PrivateRoute"; // import your PrivateRoute
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {userRoutes}
        {/* Add more protected routes here */}
      </Route>
       <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
