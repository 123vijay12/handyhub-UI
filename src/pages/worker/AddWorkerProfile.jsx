// src/pages/workers/AddWorker.jsx
import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createWorkerProfile } from "../../api/workerProfileApi";
import UserStep from "../../components/workerSteps/UserStep";
import WorkStep from "../../components/workerSteps/workDetailsForm";
import AvailabilityStep from "../../components/workerSteps/AvailabilityStep";

const AddWorker = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });

  const handleStepSubmit = async (data) => {
    const updated = { ...formData, ...data };
    setFormData(updated);

    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      try {
        // Combine userDTO and worker details for API
          const payload = {
            profession: updated.profession,
            experience: updated.experience,
            hourlyRate: parseFloat(updated.hourlyRate),
            serviceArea: updated.serviceArea,
            available: updated.available,
            subCategoryId: updated.subcategoryId,   // ✅ from response
            categoryId: updated.categoryId,
            skills: updated.skills
              ? updated.skills.split(",").map((s) => s.trim()) // ✅ convert string → array
              : [],
            userDTO: {
              employeeId: updated.employeeId,
              firstName: updated.firstName,
              lastName: updated.lastName,
              email: updated.email,
              password: updated.password,
              phone: updated.phone,
              dateOfBirth: updated.birthDate, // ✅ rename
              gender: updated.gender,
              address: updated.address,
              city: updated.city,
              state: updated.state,
              country: updated.country,
            },
          };
          console.log("before submiting..",updated)
    console.log("before submiting..",payload)
        await createWorkerProfile(payload);

        setSnackbar({ open: true, msg: "Worker profile created!", severity: "success" });
        setTimeout(() => navigate("/workers"), 1500);
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, msg: "Error creating worker", severity: "error" });
      }
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0: return <UserStep onNext={handleStepSubmit} initialData={formData} />;
      case 1: return <WorkStep onNext={handleStepSubmit} initialData={formData} />;
      case 2: return <AvailabilityStep onNext={handleStepSubmit} initialData={formData} />;
      default: return null;
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Add Worker</Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        <Step><StepLabel>User</StepLabel></Step>
        <Step><StepLabel>Work</StepLabel></Step>
        <Step><StepLabel>Availability</StepLabel></Step>
      </Stepper>

      <Box mt={4}>{renderStep()}</Box>

      {activeStep > 0 && (
        <Button onClick={() => setActiveStep((prev) => prev - 1)} sx={{ mt: 2 }}>
          Back
        </Button>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddWorker;
