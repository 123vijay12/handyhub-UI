import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Stack,
  Divider
} from "@mui/material";
import { Mail, Phone, MapPin, UserRound, TrashIcon, Pencil } from "lucide-react";
import NoDataFound from "../../components/NoDataFound";
import useUsers from "../../routes/useUsers";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/userApi";

const UserList = () => {
  const { users: initialUsers, loading } = useUsers();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialUsers) setUsers(initialUsers);
  }, [initialUsers]);

  const handleEdit = (userId) => navigate(`/users/edit/${userId}`);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box bgcolor="#f9fafc" minHeight="100vh" py={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          User List
        </Typography>
        <Button variant="contained" onClick={() => navigate("/users/create")}>
          Create New User
        </Button>
      </Box>

      {/* User Cards */}
      <Grid container spacing={3}>
        {users.length > 0 ? (
          users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6
                  }
                }}
              >
                {/* Avatar + Name */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  p={2}
                  bgcolor="#f4f6f8"
                  borderTopLeftRadius={12}
                  borderTopRightRadius={12}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.light",
                      p: 1.5,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <UserRound size={28} color="#fff" />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.city}, {user.state}
                    </Typography>
                  </Box>
                </Box>

                {/* User Details */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1.5} sx={{ color: "text.secondary" }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Phone size={16} color="#1976d2" />
                      <Typography variant="body2">{user.phone}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Mail size={16} color="green" />
                      <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="flex-start" gap={1}>
                      <MapPin size={16} color="red" />
                      <Typography variant="body2">
                        {user.address}, {user.city}, {user.state}, {user.country}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <Divider />

                {/* Actions */}
                <Box display="flex" justifyContent="space-between" px={2} py={1}>
                  <IconButton color="primary" onClick={() => handleEdit(user.id)}>
                    <Pencil size={18} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(user.id)}>
                    <TrashIcon size={18} />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <NoDataFound />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserList;
