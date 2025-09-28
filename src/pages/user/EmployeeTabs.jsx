import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Fade
} from "@mui/material";
import { User, Briefcase } from "lucide-react"; // ✅ valid icons
import UserList from "./UserList";
import AddWorkerProfile from "../worker/WorkerList";

const TabPanel = ({ children, value, index }) => {
  return (
    <Fade in={value === index} timeout={300} unmountOnExit>
      <Box hidden={value !== index} sx={{ mt: 2 }}>
        {value === index && <Box>{children}</Box>}
      </Box>
    </Fade>
  );
};

const EmployeeTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
          Employee Management
        </Typography>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": { fontWeight: 600, textTransform: "none" },
            "& .Mui-selected": { color: "primary.main" }
          }}
        >
          <Tab icon={<User size={18} />} iconPosition="start" label="Users" />
          <Tab
            icon={<Briefcase size={18} />}
            iconPosition="start"
            label="Workers"
          />
        </Tabs>

        {/* Tab Panels */}
        <TabPanel value={activeTab} index={0}>
          <UserList />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <AddWorkerProfile></AddWorkerProfile>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default EmployeeTabs;
