import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const UserProfile = ({ user }) => {
  return (
       <Box bgcolor="#f4f6f8" minHeight="100vh" py={4} px={3}>
      {/* LEFT PANEL */}
      <Grid item xs={12} md={4}>
        <Card sx={{ textAlign: "center", p: 3 }}>
          <Avatar
            src={user.profilePictureUrl}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 2,
              bgcolor: "#1976d2",
              fontSize: 40,
            }}
          >
            {user.firstName?.charAt(0)}
          </Avatar>

          <Typography variant="h6" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>

          <Box mt={2}>
            <Chip
              label={user.active ? "Active" : "Inactive"}
              color={user.active ? "success" : "default"}
            />
          </Box>
        </Card>
      </Grid>

      {/* RIGHT PANEL */}
      <Grid item xs={12} md={8}>
        {/* PERSONAL INFO */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Gender
                </Typography>
                <Typography>{user.gender}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth
                </Typography>
                <Typography>{user.dateOfBirth}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Nationality
                </Typography>
                <Typography>{user.nationality}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" mb={1}>
              <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography>{user.phone}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
              <Typography>{user.email}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* ADDRESS */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Address
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="flex-start">
              <LocationOnIcon sx={{ mr: 1, mt: 0.5, color: "text.secondary" }} />
              <Typography>
                {user.address}, {user.city}, {user.state},{" "}
                {user.country}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
};

export default UserProfile;
