import { Box, Paper, Typography } from "@mui/material";
import UserList from "./UserList";

const EmployeesPage = () => {
  return (
    <Box bgcolor="#f4f6f8" minHeight="100vh" py={4} px={3}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          maxWidth: "1200px",
          mx: "auto",
          bgcolor: "#fff"
        }}
      >
        {/* Header */}
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Employees Management
        </Typography>

        {/* Content */}
        <UserList />
      </Paper>
    </Box>
  );
};

export default EmployeesPage;
