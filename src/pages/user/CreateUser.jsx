// src/pages/Employees/AddEmployee.jsx
import React, { useEffect, useState } from "react";
import DynamicForm from "../../components/util/DynamicForm";
import { fetchRoles } from "../../api/roleApi";
import { createUser } from "../../api/userApi";

const AddEmployee = () => {
  const [roles, setRoles] = useState([]);

  // Fetch roles on mount
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const res = await fetchRoles();
        console.log(res)
        setRoles(res.data); // [{id, name, ...}]
      } catch (err) {
        console.error("Failed to fetch roles", err);
      }
    };
    loadRoles();
  }, []);

  // Config schema for the form
  const formConfig = {
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
            type: "multiselect", // your DynamicForm should support this
            options: roles.map((r) => ({ label: r.name, value: r.id })),
            required: true,
          },
        ],
      },
    ],
    submitButton: { label: "Save Employee" },
  };

  // Submit handler
  const handleSubmit = async (formData) => {
    // Prepare payload
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
      roles: formData.roles, // already array of IDs from multiselect
    };

    try {
      const response = await createUser(userPayload);
      console.log("User added:", response.data);
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee");
    }
  };

  return <DynamicForm config={formConfig} onSubmit={handleSubmit} />;
};

export default AddEmployee;
