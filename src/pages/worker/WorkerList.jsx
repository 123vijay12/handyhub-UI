import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  fetchWorkerProfiles,
  deleteWorkerProfile,
} from "../../api/workerProfileApi";

const WorkersList = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    severity: "success",
  });
  const [deleteRow, setDeleteRow] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadWorkers = async () => {
      try {
        setLoading(true);
        const res = await fetchWorkerProfiles();
        setWorkers(res.data);
      } catch (error) {
        console.error(error);
        setSnackbar({
          open: true,
          msg: "Failed to load workers",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    loadWorkers();
  }, []);

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

  const columns = [
    { field: "employeeId", headerName: "Employee ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { 
      field: "email", 
      headerName: "Email", 
      width: 220,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    { 
      field: "profession", 
      headerName: "Profession", 
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    { field: "experience", headerName: "Experience", width: 120 },
    {
      field: "hourlyRate",
      headerName: "Hourly Rate",
      width: 120,
      valueFormatter: ({ value }) => `$${value}`,
    },
    { 
      field: "serviceArea", 
      headerName: "Service Area", 
      width: 150,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
            {params.value}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: "available",
      headerName: "Available",
      width: 110,
      valueFormatter: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/handyhub/workers/edit/${params.row.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => setDeleteRow(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const confirmDelete = async () => {
    try {
      await deleteWorkerProfile(deleteRow.id);
      setWorkers((prev) => prev.filter((w) => w.id !== deleteRow.id));
      setSnackbar({
        open: true,
        msg: "Worker deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        msg: "Failed to delete worker",
        severity: "error",
      });
    } finally {
      setDeleteRow(null);
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
      {/* Header */}
      {/* <Box mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h5" fontWeight={600}>
          Workers
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/handyhub/workers/add")}
        >
          Add Worker
        </Button>
      </Box> */}

      {/* DataGrid */}
      <Box height={600}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowDoubleClick={(params) =>
            navigate(`/workers/${params.row.id}`)
          }
          disableRowSelectionOnClick
        />
      </Box>

      {/* Delete Dialog */}
      <Dialog open={Boolean(deleteRow)} onClose={() => setDeleteRow(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <b>
              {deleteRow?.firstName} {deleteRow?.lastName}
            </b>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteRow(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
