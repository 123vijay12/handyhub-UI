import React, { useState } from "react"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DynamicModalForm({ open, onClose, config, onSubmit }) {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        initial[field.name] = field.type === "datetime" ? null : field.defaultValue || "";
      });
    });
    return initial;
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    config.sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${field.label} is required`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
    onClose();
  };

  const renderField = (field) => {
    const value = formData[field.name];
    const error = errors[field.name];

    switch (field.type) {
      case "textarea":
        return (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            value={value}
            onChange={handleChange}
            required={field.required}
            multiline
            rows={4}
            fullWidth
            error={!!error}
            helperText={error || ""}
            sx={{ mb: 2, borderRadius: 3 }}
          />
        );

      case "select":
        return (
          <FormControl key={field.name} fullWidth sx={{ mb: 2 }}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={value || ""}
              onChange={handleChange}
              input={<OutlinedInput label={field.label} />}
              error={!!error}
              sx={{ borderRadius: 3 }}
            >
              {field.options?.map(opt => {
                const val = typeof opt === "object" ? opt.value : opt;
                const label = typeof opt === "object" ? opt.label : opt;
                return <MenuItem key={val} value={val}>{label}</MenuItem>;
              })}
            </Select>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        );

      case "datetime":
        return (
          <LocalizationProvider key={field.name} dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label={field.label}
              value={value ? dayjs(value) : null}
              onChange={(newValue) =>
                setFormData(prev => ({ ...prev, [field.name]: newValue }))
              }
              slotProps={{
                paper: { sx: { borderRadius: 3 } } // rounded dropdown
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  required={field.required}
                  error={!!error}
                  helperText={error || ""}
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    "& .MuiInputBase-root": { borderRadius: 3 },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <TextField
            key={field.name}
            type={field.type === "file" ? "file" : field.type}
            name={field.name}
            label={field.label}
            value={field.type === "file" ? undefined : value || ""}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ""}
            InputLabelProps={field.type === "date" ? { shrink: true } : {}}
            fullWidth
            error={!!error}
            helperText={error || ""}
            sx={{ mb: 2, borderRadius: 3 }}
          />
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {config.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {config.sections.map((section, idx) => (
          <Box key={idx} mb={3}>
            {section.title && <Typography mb={2} fontWeight="bold">{section.title}</Typography>}
            {section.fields.map(renderField)}
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {config.submitButton?.label || "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
