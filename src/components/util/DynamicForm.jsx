import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";

const DynamicForm = ({ config, fields, onSubmit, initialData = {}, onFieldChange }) => {
  const allFields = fields || config?.sections?.flatMap((s) => s.fields) || [];

  const getInitialState = () =>
    allFields.reduce((acc, field) => {
      if (field.type === "checkbox-group" || field.type === "multiselect") {
        acc[field.name] = initialData[field.name] || field.defaultValue || [];
      } else {
        acc[field.name] = initialData[field.name] ?? field.defaultValue ?? "";
      }
      return acc;
    }, {});

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    setFormData(getInitialState());
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox" && Array.isArray(formData[name])) {
      const updated = checked
        ? [...formData[name], value]
        : formData[name].filter((v) => v !== value);
      setFormData({ ...formData, [name]: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // 🔹 notify parent if callback exists
    if (onFieldChange) {
      onFieldChange(name, type === "checkbox" ? formData[name] : value);
    }
  };

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
              <h3 className="text-lg font-semibold border-b mb-4 pb-2">{section.title}</h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.fields.map((field) => renderField(field, formData, handleChange))}
            </div>
          </section>
        ))}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {config?.submitButton?.label || "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Render individual field
function renderField(field, formData, handleChange) {
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
      />
    );
  }

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
  

  // default input
return (
  <TextField
    key={field.name}
    type={field.type}
    name={field.name}
    label={field.label}
    value={field.type === "file" ? undefined : formData[field.name] || ""}
    onChange={handleChange}
    required={field.required}
    placeholder={field.placeholder || ""} // <-- Add this line
    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
  />
);

}

export default DynamicForm;
