// src/components/LoadingIndicator.jsx
import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingIndicator;
