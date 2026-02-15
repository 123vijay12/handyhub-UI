import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Pencil, Trash2 } from "lucide-react";
import useUsers from "../../routes/useUsers";
import { deleteUser } from "../../api/userApi";

const UserList = () => {
  const { users: initialUsers, loading } = useUsers();
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    msg: "",
    severity: "success"
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialUsers) setUsers(initialUsers);
  }, [initialUsers]);

  /* ---------------- Columns ---------------- */
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    { field: "name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1.2 },

    { field: "phone", headerName: "Phone", width: 150 },

    { field: "city", headerName: "City", width: 120 },

    { field: "state", headerName: "State", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => navigate(`/handyhub/users/edit/${params.row.id}`)}
          >
            <Pencil size={18} />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <Trash2 size={18} />
          </IconButton>
        </>
      )
    }
  ];

  /* ---------------- Rows ---------------- */
  const rows = users.map((u) => ({
    id: u.id,
    name: u.name || `${u.firstName ?? ""} ${u.lastName ?? ""}`,
    email: u.email,
    phone: u.phone,
    city: u.city,
    state: u.state
  }));

  /* ---------------- Delete ---------------- */
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setSnackbar({
        open: true,
        msg: "User deleted successfully",
        severity: "success"
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        msg: "Failed to delete user",
        severity: "error"
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={() => navigate("/handyhub/users/create")}
        >
          Create New User
        </Button>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } }
          }}
          disableRowSelectionOnClick
          onRowDoubleClick={(params) =>
            navigate(`/handyhub/users/${params.row.id}`)
          }
        />
      </Box>

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

export default UserList;
