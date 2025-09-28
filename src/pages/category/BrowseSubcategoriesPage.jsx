import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Card, Typography, Button, Paper } from "@mui/material";
import { fetchSubcategoriesByCategoryId } from "../../api/subcategoryApi";
import { fetchUsers } from "../../api/userApi";


export default function BrowseWorkersPage() {
  const { categoryId } = useParams(); // get categoryId from URL
  const [subcategories, setSubcategories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch subcategories dynamically based on categoryId from URL
    if (categoryId) {
      fetchSubcategoriesByCategoryId(categoryId)
        .then((res) => setSubcategories(res.data))
        .catch((err) => console.error("Error fetching subcategories:", err));
    }

    // fetch all users
    fetchUsers()
      .then((res) => setWorkers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, [categoryId]); // refetch when categoryId changes

  const handleSubClick = (subId) => setSelectedSub(subId);

  const handleSort = (option) => {
    setSortOption(option);
    let sorted = [...workers];
    if (option === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (option === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    setWorkers(sorted);
  };

  const filteredWorkers = selectedSub
    ? workers.filter((w) => w.subId === selectedSub)
    : workers;

  return (
    <Box display="flex" p={3} gap={3}>
      {/* Subcategory Panel */}
      <Paper
        elevation={3}
        sx={{ minWidth: 220, p: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">Subcategories</Typography>
        <Button
          variant={!selectedSub ? "contained" : "outlined"}
          onClick={() => setSelectedSub(null)}
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
                width={60}   // wider than tall → horizontal
                height={40}
                sx={{
                  borderRadius: 1,   // small rounded corners instead of circle
                  objectFit: "cover"
                }}
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
          {filteredWorkers.map((worker) => (
            <Grid item xs={12} key={worker.id}>
              <Card sx={{ display: "flex", p: 2, alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={worker.profileImage}
                  alt={worker.name}
                  width={100}
                  height={100}
                  sx={{ borderRadius: 2 }}
                />
                <Box flex={1}>
                  <Typography variant="h6">{worker.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{worker.skill}</Typography>
                  <Typography variant="body2" color="primary">⭐ {worker.rating}</Typography>
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
