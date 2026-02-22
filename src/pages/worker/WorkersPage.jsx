import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BuildIcon from "@mui/icons-material/Build";
import WorkersList from "./WorkerList";

const WorkersPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <BuildIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Worker Management
            </Typography>
          </Box>
          <Typography color="textSecondary">
            Manage and view all worker profiles
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/handyhub/workers/add")}
          size="large"
        >
          Add Worker
        </Button>
      </Box>

      {/* Content Card */}
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            All Workers
          </Typography>
          <Typography variant="body2" color="textSecondary">
            View and manage all registered workers and their profiles
          </Typography>
        </Box>
        <WorkersList />
      </Paper>
    </Box>
  );
};

export default WorkersPage;
