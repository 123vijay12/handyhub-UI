import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Card, Typography, Button, Paper } from "@mui/material";
import { fetchSubcategoriesByCategoryId } from "../../api/subcategoryApi";
import {
  getWorkerProfileBycategory,
  getWorkerProfileBySubcategory,
} from "../../api/workerProfileApi";

export default function BrowseWorkersPage() {
  const { categoryId } = useParams(); // get categoryId from URL
  const [subcategories, setSubcategories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch subcategories and all workers by category
  useEffect(() => {
    if (categoryId) {
      fetchSubcategoriesByCategoryId(categoryId)
        .then((res) => setSubcategories(res.data))
        .catch((err) => console.error("Error fetching subcategories:", err));

      getWorkerProfileBycategory(categoryId)
        .then((res) => setWorkers(res.data))
        .catch((err) => console.error("Error fetching workers by category:", err));
    }
  }, [categoryId]);

  // 🔹 Handle subcategory click (fetch by subcategory)
  const handleSubClick = async (subId) => {
    setSelectedSub(subId);
    if (!subId) {
      // show all category workers again
      getWorkerProfileBycategory(categoryId)
        .then((res) => setWorkers(res.data))
        .catch((err) => console.error("Error fetching workers by category:", err));
      return;
    }

    // fetch workers by subcategory
    try {
      const res = await getWorkerProfileBySubcategory(subId);
      setWorkers(res.data);
    } catch (err) {
      console.error("Error fetching workers by subcategory:", err);
    }
  };

  // 🔹 Handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...workers];
    if (option === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (option === "name")
      sorted.sort((a, b) => a.userDTO.firstName.localeCompare(b.userDTO.firstName));
    setWorkers(sorted);
  };

  return (
    <Box display="flex" p={3} gap={3}>
      {/* Subcategory Panel */}
      <Paper
        elevation={3}
        sx={{
          minWidth: 220,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6">Subcategories</Typography>
        <Button
          variant={!selectedSub ? "contained" : "outlined"}
          onClick={() => handleSubClick(null)}
        >
          All
        </Button>
        {subcategories.map((sub) => (
          <Button
            key={sub.subcategoryId}
            variant={selectedSub === sub.subcategoryId ? "contained" : "outlined"}
            onClick={() => handleSubClick(sub.subcategoryId)}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {sub.imageUrl && (
              <Box
                component="img"
                src={sub.imageUrl}
                alt={sub.subcategoryName}
                width={60}
                height={40}
                sx={{ borderRadius: 1, objectFit: "cover" }}
              />
            )}
            {sub.subcategoryName}
          </Button>
        ))}
      </Paper>

      {/* Worker List */}
      <Box flex={1}>
        <Box display="flex" justifyContent="flex-end" mb={2} gap={1}>
          <Button
            variant={sortOption === "rating" ? "contained" : "outlined"}
            onClick={() => handleSort("rating")}
          >
            Sort by Rating
          </Button>
          <Button
            variant={sortOption === "name" ? "contained" : "outlined"}
            onClick={() => handleSort("name")}
          >
            Sort by Name
          </Button>
        </Box>

        <Grid container spacing={2}>
          {workers.map((worker) => (
            <Grid item xs={12} key={worker.id}>
              <Card sx={{ display: "flex", p: 2, alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={
                    worker.userDTO.profilePictureUrl
                      ? worker.userDTO.profilePictureUrl
                      : "/avatar.jpeg"
                  }
                  alt={worker.userDTO.firstName || "User"}
                  width={100}
                  height={100}
                  sx={{ borderRadius: 2 }}
                />
                <Box flex={1}>
                  <Typography variant="h6">
                    {worker.userDTO.firstName} {worker.userDTO.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {worker.skill}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ⭐ {worker.ratings}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`/worker-profile/${worker.id}`)}
                >
                  View Profile
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
