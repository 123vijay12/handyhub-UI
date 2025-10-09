import React, { useState, useEffect, useMemo } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DynamicForm = ({
  config,
  fields,
  onSubmit,
  initialData = {},
  onFieldChange,
}) => {
  // 🔹 Collect all fields from config
  const allFields = useMemo(
    () => fields || config?.sections?.flatMap((s) => s.fields) || [],
    [fields, config]
  );

  // 🔹 Create initial form state (run once)
  const getInitialState = () =>
    allFields.reduce((acc, field) => {
      if (field.type === "checkbox-group" || field.type === "multiselect") {
        acc[field.name] = initialData[field.name] || field.defaultValue || [];
      } else {
        acc[field.name] =
          initialData[field.name] ?? field.defaultValue ?? "";
      }
      return acc;
    }, {});

  const [formData, setFormData] = useState(getInitialState);

  // ✅ Only reset when `initialData` really changes (not config)
  useEffect(() => {
    setFormData(getInitialState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialData)]);

  // 🔹 Handle field changes safely
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    setFormData((prev) => {
      let updated = { ...prev };

      if (type === "file") {
        updated[name] = files[0];
      } else if (type === "checkbox" && Array.isArray(prev[name])) {
        updated[name] = checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value);
      } else {
        updated[name] = value;
      }

      if (onFieldChange) {
        onFieldChange(name, updated[name]);
      }

      return updated;
    });
  };

  // 🔹 Handle date/datetime changes
  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue?.toISOString() || "" }));
    if (onFieldChange) {
      onFieldChange(name, newValue?.toISOString() || "");
    }
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 shadow bg-white rounded">
      {config?.title && <h2 className="text-2xl font-bold mb-6">{config.title}</h2>}
      <form onSubmit={handleSubmit} className="space-y-8">
        {config?.sections?.map((section, idx) => (
          <section key={idx}>
            {section.title && (
              <h3 className="text-lg font-semibold border-b mb-4 pb-2">
                {section.title}
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.fields.map((field) =>
                renderField(field, formData, handleChange, handleDateChange)
              )}
            </div>
          </section>
        ))}
        <div className="text-right">
          <Button type="submit" variant="contained" color="primary">
            {config?.submitButton?.label || "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

function renderField(field, formData, handleChange, handleDateChange) {
  // 🔹 Multiselect
  if (field.type === "multiselect") {
    return (
      <FormControl key={field.name} fullWidth>
        <InputLabel>{field.label}</InputLabel>
        <Select
          multiple
          name={field.name}
          value={formData[field.name] || []}
          onChange={(e) =>
            handleChange({
              target: { name: field.name, value: e.target.value },
            })
          }
          input={<OutlinedInput label={field.label} />}
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(", ") : selected
          }
        >
          {field.options?.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            return (
              <MenuItem key={val} value={val}>
                <Checkbox checked={formData[field.name]?.includes(val)} />
                <ListItemText primary={label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  // 🔹 Select
  if (field.type === "select") {
    return (
      <FormControl key={field.name} fullWidth>
        <InputLabel>{field.label}</InputLabel>
        <Select
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          required={field.required}
          input={<OutlinedInput label={field.label} />}
        >
          {field.options?.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            return (
              <MenuItem key={val} value={val}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }

  // 🔹 DateTimePicker
  if (field.type === "datetime" || field.type === "date") {
    return (
      <LocalizationProvider key={field.name} dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={field.label}
          value={formData[field.name] ? dayjs(formData[field.name]) : null}
          onChange={(newValue) => handleDateChange(field.name, newValue)}
          renderInput={(params) => (
            <TextField {...params} fullWidth required={field.required} />
          )}
        />
      </LocalizationProvider>
    );
  }

  // 🔹 Textarea
  if (field.type === "textarea") {
    return (
      <TextField
        key={field.name}
        name={field.name}
        label={field.label}
        value={formData[field.name]}
        onChange={handleChange}
        required={field.required}
        multiline
        rows={4}
        fullWidth
      />
    );
  }

  // 🔹 Default text, password, number, file, etc.
  return (
    <TextField
      key={field.name}
      type={field.type === "file" ? "file" : field.type}
      name={field.name}
      label={field.label}
      value={field.type === "file" ? undefined : formData[field.name] || ""}
      onChange={handleChange}
      required={field.required}
      placeholder={field.placeholder || ""}
      InputLabelProps={field.type === "date" ? { shrink: true } : {}}
      fullWidth
    />
  );
}

export default DynamicForm;
