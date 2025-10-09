// src/pages/workers/EditWorker.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { getWorkerProfileById, updateWorkerProfile } from "../../api/workerProfileApi";
import UserStep from "../../components/workerSteps/UserStep";
import WorkStep from "../../components/workerSteps/workDetailsForm";
import AvailabilityStep from "../../components/workerSteps/AvailabilityStep";

const EditWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // worker ID from route
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });
  const [loading, setLoading] = useState(true); // loading state

  // Load worker data on mount
  useEffect(() => {
    const loadWorker = async () => {
      try {
        const res = await getWorkerProfileById(id);
        const data = res.data;

        // Merge worker + userDTO for form
        setFormData({
          employeeId: data.userDTO?.employeeId || "",
          firstName: data.userDTO?.firstName || "",
          lastName: data.userDTO?.lastName || "",
          email: data.userDTO?.email || "",
          phone: data.userDTO?.phone || "",
          birthDate: data.userDTO?.dateOfBirth || "",
          gender: data.userDTO?.gender || "",
          address: data.userDTO?.address || "",
          city: data.userDTO?.city || "",
          state: data.userDTO?.state || "",
          country: data.userDTO?.country || "",
          profession: data.profession || "",
          experience: data.experience || "",
          hourlyRate: data.hourlyRate || "",
          serviceArea: data.serviceArea || "",
          available: data.available ?? true,
        });
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, msg: "Error loading worker data", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadWorker();
  }, [id]);

  const handleStepSubmit = async (data) => {
    const updated = { ...formData, ...data };
    setFormData(updated);

    if (activeStep < 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      try {
      const payload = {
          profession: updated.profession,
          experience: updated.experience,
          hourlyRate: parseFloat(updated.hourlyRate),
          serviceArea: updated.serviceArea,
          available: updated.available,
          subCategoryId: updated.subcategoryId,   // added subCategoryId
          categoryId:updated.categoryId,
          skills: updated.skills
            ? updated.skills.split(",").map((s) => s.trim()) // convert string → array
            : [],
          userDTO: {
            employeeId: updated.employeeId,
            firstName: updated.firstName,
            lastName: updated.lastName,
            email: updated.email,
            phone: updated.phone,
            dateOfBirth: updated.birthDate, // ensure key matches backend
            gender: updated.gender,
            address: updated.address,
            city: updated.city,
            state: updated.state,
            country: updated.country,
          },
        };


        await updateWorkerProfile(id, payload);
        setSnackbar({ open: true, msg: "Worker profile updated!", severity: "success" });
        setTimeout(() => navigate("/workers"), 1500);
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, msg: "Error updating worker", severity: "error" });
      }
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <UserStep onNext={handleStepSubmit} initialData={formData} />;
      case 1:
        return <WorkStep onNext={handleStepSubmit} initialData={formData} />;
      case 2:
        return <AvailabilityStep onNext={handleStepSubmit} initialData={formData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Edit Worker</Typography>

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

export default EditWorker;
