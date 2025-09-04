// src/pages/SubcategoriesPage.jsx
import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardActions, Button, Typography,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress, Box
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  fetchSubcategoriesByCategoryId,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../api/subcategoryApi";
import CustomSnackbar from "../components/util/CustomSnackbar";

const SubcategoriesPage = () => {
  const { categoryId } = useParams();

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    subcategoryName: "",
    subcategoryDescription: "",
    categoryId: categoryId,
  });
  const [editId, setEditId] = useState(null);

  const loadSubcategories = async () => {
    setLoading(true);
    try {
      const res = await fetchSubcategoriesByCategoryId(categoryId);
      setSubcategories(res.data || []);
    } catch {
      showSnackbar("Failed to load subcategories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) loadSubcategories();
  }, [categoryId]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({
      subcategoryName: "",
      subcategoryDescription: "",
      categoryId: categoryId,
    });
    setDialogOpen(true);
  };

  const handleEditClick = (sub) => {
    setEditId(sub.subcategoryId);
    setFormData({
      subcategoryName: sub.subcategoryName,
      subcategoryDescription: sub.subcategoryDescription,
      categoryId: sub.categoryId,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await updateSubcategory(editId, formData);
        showSnackbar("Subcategory updated successfully");
      } else {
        await createSubcategory(formData);
        showSnackbar("Subcategory added successfully");
      }
      setDialogOpen(false);
      loadSubcategories();
    } catch {
      showSnackbar("Failed to save subcategory", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubcategory(id);
      showSnackbar("Subcategory deleted successfully");
      loadSubcategories();
    } catch {
      showSnackbar("Failed to delete subcategory", "error");
    }
  };

  return (
    <Box p={3} bgcolor="#f9fafc" minHeight="100vh">
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Subcategories
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 3, bgcolor: "#1976d2", "&:hover": { bgcolor: "#125ea2" } }}
        onClick={handleAddClick}
      >
        Add Subcategory
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {subcategories.map((sub) => (
            <Grid item xs={12} sm={6} md={4} key={sub.subcategoryId}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* Image placeholder */}
                <Box
                  component="img"
                  src={
                    sub.image ||
                    "https://www.shutterstock.com/image-vector/category-prioritize-work-project-management-260nw-2180299987.jpg"
                  }
                  alt={sub.subcategoryName}
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                  }}
                />

                {/* Title & Description */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {sub.subcategoryName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {sub.subcategoryDescription}
                  </Typography>
                </CardContent>

                {/* Action Buttons */}
                <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                  <Button
   size="small"
            variant="contained"
            color="secondary"
                    onClick={() => handleEditClick(sub)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(sub.subcategoryId)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editId ? "Edit Subcategory" : "Add Subcategory"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Subcategory Name"
            name="subcategoryName"
            value={formData.subcategoryName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Subcategory Description"
            name="subcategoryDescription"
            value={formData.subcategoryDescription}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        severity={snackbarSeverity}
      />
    </Box>
  );
};

export default SubcategoriesPage;
