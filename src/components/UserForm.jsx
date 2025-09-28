// src/pages/Employees/AddEmployee.jsx
import React, { useEffect, useState } from "react";
import UserForm from "../../components/forms/UserForm";
import { fetchRoles } from "../../api/roleApi";
import { createUser } from "../../api/userApi";
import CustomSnackbar from "../../components/util/CustomSnackbar";

const AddEmployee = () => {
  const [roles, setRoles] = useState([]);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Snackbar helper
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Fetch roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchRoles();
        setRoles(res.data || []);
      } catch (err) {
        console.error("Failed to fetch roles", err);
        showSnackbar("Failed to fetch roles", "error");
      }
    };
    loadRoles();
  }, []);

  // Submit handler
  const handleSubmit = async (formData) => {
    const userPayload = {
      username: formData.email.split("@")[0],
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      isActive: true,
      createdBy: 1,
      createdAt: new Date().toISOString(),
      updatedBy: 1,
      updatedAt: new Date().toISOString(),
      gender: formData.gender,
      dateOfBirth: formData.birthDate,
      nationality: formData.nationality,
      profilePictureUrl: "http://example.com/images/avatar.png",
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      roles: formData.roles,
    };

    try {
      const response = await createUser(userPayload);
      console.log("User added:", response.data);
      showSnackbar("Employee added successfully", "success");
    } catch (error) {
      console.error("Error adding employee:", error);
      showSnackbar("Failed to add employee", "error");
    }
  };

  return (
    <>
      <UserForm 
        roles={roles} 
        onSubmit={handleSubmit} 
        submitButtonLabel="Save Employee" 
      />
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        severity={snackbarSeverity}
      />
    </>
  );
};

export default AddEmployee;