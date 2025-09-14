import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/util/DynamicForm";
import { createWorkerProfile } from "../../api/workerProfileApi";

const AddWorkerProfile = () => {
  const navigate = useNavigate();

  // Step state
  const [activeStep, setActiveStep] = useState(0);

  // Form schemas for each step
  const stepForms = [
    {
      title: "Basic User Details",
      sections: [
        {
          title: "User Link",
          fields: [
            { label: "User ID", name: "userId", type: "number", required: true },
          ],
        },
      ],
      submitButton: { label: "Next" },
    },
    {
      title: "Work Details",
      sections: [
        {
          title: "Profession Info",
          fields: [
            { label: "Profession", name: "profession", type: "text", required: true },
            { label: "Experience", name: "experience", type: "text", required: true },
            { label: "Hourly Rate", name: "hourlyRate", type: "number", required: true },
          ],
        },
      ],
      submitButton: { label: "Next" },
    },
    {
      title: "Availability",
      sections: [
        {
          title: "Work Area & Availability",
          fields: [
            { label: "Service Area", name: "serviceArea", type: "text", required: true },
            {
              label: "Available",
              name: "available",
              type: "select",
              options: [
                { label: "Yes", value: true },
                { label: "No", value: false },
              ],
              required: true,
            },
          ],
        },
      ],
      submitButton: { label: "Submit Profile" },
    },
  ];

  const [formData, setFormData] = useState({});

  // Handle submit per step
const handleStepSubmit = async (data) => {
  setFormData((prev) => ({ ...prev, ...data }));

  if (activeStep < stepForms.length - 1) {
    setActiveStep((prev) => prev + 1);
  } else {
    const payload = {
      ...formData,
      ...data,
      userId: Number(data.userId || formData.userId),
      hourlyRate: parseFloat(data.hourlyRate || formData.hourlyRate),
      available:
        data.available === true ||
        data.available === "true" ||
        formData.available === true,
    };

    try {
      const res = await createWorkerProfile(payload);
      console.log("Profile created:", res.data);
      alert("Worker profile created successfully!");
      navigate("/workers");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create worker profile");
    }
  }
};

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Add Worker Profile</Typography>

      {/* MUI Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepForms.map((s, i) => (
          <Step key={i}>
            <StepLabel>{s.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        <DynamicForm
          key={activeStep} // reset form on step change
          config={stepForms[activeStep]}
          onSubmit={handleStepSubmit}
        />
      </Box>

      {/* Back button (except first step) */}
      <Box mt={2} display="flex" justifyContent="flex-start">
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep((prev) => prev - 1)}>Back</Button>
        )}
      </Box>
    </Box>
  );
};

export default AddWorkerProfile;
