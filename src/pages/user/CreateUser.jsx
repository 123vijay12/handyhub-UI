import React, { useEffect, useState, useMemo } from "react";
import DynamicForm from "../../components/util/DynamicForm";
import { fetchRoles } from "../../api/roleApi";
import { createUser } from "../../api/userApi";
import CustomSnackbar from "../../components/util/CustomSnackbar";

const AddEmployee = () => {
  const [roles, setRoles] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

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

  // ✅ FIX: useMemo to prevent re-creating config
  const formConfig = useMemo(() => ({
    title: "Add Employee",
    sections: [
      {
        title: "Basic User Details",
        fields: [
          { label: "Employee ID", name: "employeeId", type: "text", required: true },
          { label: "Salutation", name: "salutation", type: "select", options: ["Mr.", "Ms.", "Mrs.", "Dr."] },
          { label: "Password", name: "password", type: "password", required: true },
          { label: "First Name", name: "firstName", type: "text", required: true },
          { label: "Last Name", name: "lastName", type: "text", required: true },
          { label: "Photo", name: "photo", type: "file" },
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
          { label: "Email", name: "email", type: "email" },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
        ],
      },
      {
        title: "Role Assignment",
        fields: [
          {
            label: "Roles",
            name: "roles",
            type: "multiselect",
            options: roles.map((r) => ({ label: r.name, value: r.id })),
            required: true,
          },
        ],
      },
    ],
    submitButton: { label: "Save Employee" },
  }), [roles]); // only recreate when roles change

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
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />
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
