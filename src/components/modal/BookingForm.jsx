// src/components/booking/BookingForm.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function BookingForm({ worker, onSubmit, onCancel }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [address, setAddress] = useState(worker.address || "");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(worker.hourlyRate || 0);
  const [serviceType, setServiceType] = useState("");

  const handleSubmit = () => {
    if (!startTime || !endTime || !address || !serviceType) {
      return alert("Please fill all required fields.");
    }

    onSubmit({
      scheduledStartTime: startTime,
      scheduledEndTime: endTime,
      address,
      description,
      estimatedPrice,
      serviceType,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" flexDirection="column" gap={2}>

        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          renderInput={(params) => <TextField {...params} required />}
        />

        <DateTimePicker
          label="End Time"
          value={endTime}
          onChange={setEndTime}
          renderInput={(params) => <TextField {...params} required />}
        />

        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <TextField
          label="Estimated Price"
          type="number"
          value={estimatedPrice}
          onChange={(e) => setEstimatedPrice(Number(e.target.value))}
          required
        />

        <TextField
          select
          label="Service Type"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
        >
          {["Plumbing", "Electrician", "Cleaning", "Other"].map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </TextField>

        <Box display="flex" gap={1} justifyContent="flex-end">
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Confirm Booking</Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
