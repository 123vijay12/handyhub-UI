import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import SuccessIcon from "../../assets/icon.png"; // adjust path
import CloseIcon from "@mui/icons-material/Close";

export default function BookingConfirmation({ open, message, onClose }) {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 3,
          borderRadius: 2,
          minWidth: 300,
          maxWidth: 400,
          bgcolor: "white",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="img"
          src={SuccessIcon}
          alt="success"
          sx={{ width: 48, height: 48 }}
        />
        <Typography variant="h6">{message}</Typography>
      </Paper>
    </Box>
  );
}
