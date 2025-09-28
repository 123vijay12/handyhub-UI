import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import DynamicTable from "../../components/util/DynamicDataTable";
import { deleteWorkerProfile, fetchWorkerProfiles } from "../../api/workerProfileApi";

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkerProfiles();
        setWorkers(response.data);
      } catch (err) {
        console.error(err);
        setSnackbar({ open: true, msg: "Failed to load workers", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    loadWorkers();
  }, []);

  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "profession", headerName: "Profession", width: 150 },
    { field: "experience", headerName: "Experience", width: 120 },
    { field: "hourlyRate", headerName: "Hourly Rate", width: 120, valueFormatter: ({ value }) => `$${value}` },
    { field: "serviceArea", headerName: "Service Area", width: 150 },
    { field: "available", headerName: "Available", width: 100, valueFormatter: ({ value }) => (value ? "Yes" : "No") },
  ];

  const rows = workers.map((w) => ({
    id: w.id,
    employeeId: w.userDTO?.username || w.userDTO?.id || "-",
    firstName: w.userDTO?.firstName || "",
    lastName: w.userDTO?.lastName || "",
    email: w.userDTO?.email || "",
    profession: w.profession,
    experience: w.experience,
    hourlyRate: w.hourlyRate,
    serviceArea: w.serviceArea,
    available: w.available,
  }));

  const handleEdit = (row) => {
    navigate(`/workers/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.firstName} ${row.lastName}?`)) {
      try {
        await deleteWorkerProfile(row.id);

        // Update local state
        setWorkers((prev) => prev.filter((r) => r.id !== row.id));

        setSnackbar({ open: true, msg: "Worker deleted successfully!", severity: "success" });
      } catch (error) {
        console.error("Failed to delete worker:", error);
        setSnackbar({ open: true, msg: "Failed to delete worker. Please try again.", severity: "error" });
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Add Worker Button */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/workers/add")}
        >
          Add Worker
        </Button>
      </Box>

      {/* Workers Table */}
      <DynamicTable
        title="Workers"
        columns={columns}
        rows={rows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={(row) => navigate(`/workers/${row.id}`)}
        containerHeight="600px"
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WorkersList;
