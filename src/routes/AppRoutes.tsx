// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CreateUser from '../pages/CreateUser';
import UserList from '../pages/UserList';
import EditEmployee from '../pages/EditUser';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditEmployee />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default AppRoutes;
