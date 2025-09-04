import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardActions, Button, Typography,
  Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress, Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCategories, createCategory, updateCategory } from "../api/categoryApi";
import CustomSnackbar from "../components/util/CustomSnackbar";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ categoryName: "", categoryDescription: "" });
  const [editId, setEditId] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchCategories();
      setCategories(res.data || []);
    } catch {
      showSnackbar("Failed to load categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMsg(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddClick = () => {
    setEditId(null);
    setFormData({ categoryName: "", categoryDescription: "" });
    setDialogOpen(true);
  };

  const handleEditClick = (category) => {
    setEditId(category.id);
    setFormData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await updateCategory(editId, formData);
        showSnackbar("Category updated successfully");
      } else {
        await createCategory(formData);
        showSnackbar("Category added successfully");
      }
      setDialogOpen(false);
      loadCategories();
    } catch {
      showSnackbar("Failed to save category", "error");
    }
  };

  return (
  <Box p={3} bgcolor="#f9fafc" minHeight="100vh">
    <Typography variant="h4" gutterBottom fontWeight="bold">
      Categories
    </Typography>
    <Button
      variant="contained"
      sx={{
        mb: 3,
        bgcolor: "#1976d2",
        "&:hover": { bgcolor: "#125ea2" }
      }}
      onClick={handleAddClick}
    >
      Add Category
    </Button>

    {loading ? (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    ) : (
<Grid container spacing={3}>
  {categories.map((cat) => (
    <Grid item xs={12} sm={6} md={4} key={cat.id}>
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
            boxShadow: 6
          }
        }}
      >
        {/* Image placeholder */}
        <Box
          component="img"
          src={cat.categoryImage || "https://t4.ftcdn.net/jpg/00/81/38/59/360_F_81385977_wNaDMtgrIj5uU5QEQLcC9UNzkJc57xbu.jpg"}
          alt={cat.categoryName}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            backgroundColor: "#f0f0f0"
          }}
        />

        {/* Title & Description */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {cat.categoryName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cat.categoryDescription}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/categories/${cat.categoryId}/subcategories`)}
          >
            View Subcategories
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleEditClick(cat)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))}
</Grid>

    )}

    {/* Add/Edit Dialog */}
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Category Description"
          name="categoryDescription"
          value={formData.categoryDescription}
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

export default CategoryPage;
