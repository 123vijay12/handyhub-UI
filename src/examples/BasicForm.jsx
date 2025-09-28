import React from "react";
import DynamicForm from "../../components/DynamicForm";
import { Snackbar, Alert } from "@mui/material";

const BasicForm = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);
    setSnackbar({
      open: true,
      message: "Form submitted successfully!",
      severity: "success",
    });
  };

  const formConfig = {
    title: "Basic User Form",
    sections: [
      {
        title: "Personal Info",
        fields: [
          { label: "Name", name: "name", type: "text", required: true },
          { label: "Email", name: "email", type: "email", required: true },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: ["Male", "Female", "Other"],
          },
        ],
      },
      {
        title: "Additional Info",
        fields: [
          { label: "Bio", name: "bio", type: "textarea", placeholder: "Tell us about yourself" },
          { label: "Profile Picture", name: "photo", type: "file" },
        ],
      },
    ],
    submitButton: { label: "Submit Form" },
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BasicForm;
