// src/components/forms/UserDetailsForm.jsx
import React from "react";
import DynamicForm from "./util/DynamicForm";

const UserDetailsForm = ({ onSubmit, initialData = {}, submitButtonLabel = "Next" }) => {
  const formConfig = {
    title: "User Details",
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
          { label: "Email", name: "email", type: "email", required: true },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
        ],
      },
    ],
    submitButton: { label: submitButtonLabel },
  };

  return <DynamicForm config={formConfig} onSubmit={onSubmit} initialData={initialData} />;
};

export default UserDetailsForm;