import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

export default function SubcategoryFormDialog({
  open,
  onClose,
  onSave,
  initialData,
  categoryid,
}) {
  const [form, setForm] = useState({
    subcategoryName: "",
    subcategoryDescription: "",
    categoryId: categoryid,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        subcategoryName: initialData.subcategoryName || "",
        subcategoryDescription: initialData.subcategoryDescription || "",
        categoryId: initialData.categoryId || categoryid,
      });
    } else {
      setForm({
        subcategoryName: "",
        subcategoryDescription: "",
        categoryId: categoryid,
      });
    }
  }, [initialData, categoryid]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialData ? "Edit Subcategory" : "Add Subcategory"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="subcategoryName"
          fullWidth
          value={form.subcategoryName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          name="subcategoryDescription"
          fullWidth
          value={form.subcategoryDescription}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(form)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
