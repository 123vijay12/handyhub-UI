// src/pages/Employees/EditEmployee.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/userApi';
import { Snackbar, Alert } from '@mui/material';
import DynamicForm from '../../components/util/DynamicForm';

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Form configuration
  const formConfig = {
    title: "Edit Employee",
    sections: [
      {
        title: "Basic User Details",
        fields: [
          { label: "Employee ID", name: "employeeId", type: "text", required: true },
          { label: "Salutation", name: "salutation", type: "select", options: ["Mr.", "Ms.", "Mrs.", "Dr."] },
          { 
            label: "Password", 
            name: "password", 
            type: "password", 
            placeholder: "Leave blank to keep existing password" 
          },
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Last Name", name: "lastName", type: "text", required: true },
        ],
      },
      {
        title: "Personal Information",
        fields: [
          { label: "Date of Birth", name: "birthDate", type: "date" },
          { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
          { label: "Nationality", name: "nationality", type: "text" },
        ],
      },
      {
        title: "Contact Details",
        fields: [
          { label: "Phone Number", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
        ],
      },
    ],
    submitButton: { label: "Update Employee" },
  };

  // Fetch user by ID
  useEffect(() => {
    getUserById(id)
      .then((res) => {
        const user = res.data;
        setFormData({
          employeeId: user.employeeId || '',
          salutation: user.salutation || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          password: '', // Don't preload password
          birthDate: user.dateOfBirth || '',
          gender: user.gender || '',
          nationality: user.nationality || '',
          phone: user.phone || '',
          email: user.email || '',
          address: user.address || '',
          city: user.city || '',
          state: user.state || '',
          country: user.country || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        setSnackbar({
          open: true,
          message: 'Failed to load user data',
          severity: 'error',
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (formData) => {
    const updatedUser = {
      username: formData.email.split('@')[0],
      firstName: formData.firstName,
      lastName: formData.lastName,
      ...(formData.password && { password: formData.password }),
      gender: formData.gender,
      dateOfBirth: formData.birthDate,
      nationality: formData.nationality,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      updatedBy: 1,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateUser(id, updatedUser);
      setSnackbar({
        open: true,
        message: 'User updated successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Update failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update user',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) return <p className="text-center mt-20">Loading user data...</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10">
      <DynamicForm 
        config={formConfig} 
        onSubmit={handleSubmit} 
        initialData={formData}
      />
      
      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EditEmployee;