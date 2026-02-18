import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { fetchSubcategoriesByCategoryId } from "../../api/subcategoryApi";
import {
  getWorkerProfileBycategory,
  getWorkerProfileBySubcategory,
} from "../../api/workerProfileApi";

export default function BrowseWorkersPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [subcategories, setSubcategories] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [sortOption, setSortOption] = useState("");

  /* ------------------ DATA LOAD ------------------ */

  useEffect(() => {
    if (!categoryId) return;

    fetchSubcategoriesByCategoryId(categoryId)
      .then((res) => setSubcategories(res.data))
      .catch(console.error);

    getWorkerProfileBycategory(categoryId)
      .then((res) => setWorkers(res.data))
      .catch(console.error);
  }, [categoryId]);

  const handleSubClick = async (subId) => {
    setSelectedSub(subId);

    try {
      const res = subId
        ? await getWorkerProfileBySubcategory(subId)
        : await getWorkerProfileBycategory(categoryId);

      setWorkers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSort = (type) => {
    setSortOption(type);
    const sorted = [...workers];

    if (type === "rating") sorted.sort((a, b) => b.ratings - a.ratings);
    if (type === "name")
      sorted.sort((a, b) =>
        a.userDTO.firstName.localeCompare(b.userDTO.firstName)
      );

    setWorkers(sorted);
  };

  /* ------------------ UI ------------------ */

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        p: 2,
        mt: 8,
        height: "100%",
      }}
    >
      {/* ---------------- SUBCATEGORY PANEL ---------------- */}
{/* ---------------- SUBCATEGORY PANEL ---------------- */}
<Paper
  elevation={3}
  sx={{
    width: isMobile ? "100%" : 240,
    maxHeight: isMobile ? "auto" : "75vh",
    overflowY: isMobile ? "hidden" : "auto",
    overflowX: isMobile ? "auto" : "hidden",
    display: "flex",
    flexDirection: isMobile ? "row" : "column",
    gap: 1,
    p: 1,
  }}
>
  {/* ALL BUTTON */}
  <Button
    fullWidth={!isMobile}
    variant={!selectedSub ? "contained" : "outlined"}
    onClick={() => handleSubClick(null)}
    sx={{
      flexShrink: 0,
      whiteSpace: "nowrap",
    }}
  >
    ALL
  </Button>

  {/* SUBCATEGORY BUTTONS */}
  {subcategories.map((sub) => (
    <Button
      key={sub.subcategoryId}
      variant={selectedSub === sub.subcategoryId ? "contained" : "outlined"}
      onClick={() => handleSubClick(sub.subcategoryId)}
      sx={{
        flexShrink: 0,
        justifyContent: "flex-start",
        gap: 1,
        minWidth: isMobile ? "auto" : "100%",
        whiteSpace: "nowrap",
        textTransform: "none",
      }}
    >
      {/* IMAGE */}
      {sub.imageUrl && (
        <Box
          component="img"
          src={sub.imageUrl}
          alt={sub.subcategoryName}
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      )}

      {/* TEXT */}
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: isMobile ? 120 : 160,
        }}
      >
        {sub.subcategoryName}
      </Typography>
    </Button>
  ))}
</Paper>


      {/* ---------------- WORKER LIST ---------------- */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {/* SORT BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            gap: 1,
            mb: 2,
          }}
        >
          <Button
            variant={sortOption === "rating" ? "contained" : "outlined"}
            onClick={() => handleSort("rating")}
          >
            Rating
          </Button>
          <Button
            variant={sortOption === "name" ? "contained" : "outlined"}
            onClick={() => handleSort("name")}
          >
            Name
          </Button>
        </Box>

        <Grid container spacing={2}>
          {workers.map((worker) => (
            <Grid item xs={12} sm={6} key={worker.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "center" : "center",
                  p: 2,
                  gap: 2,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                {/* PROFILE IMAGE */}
                <Box
                  component="img"
                  src={
                    worker.userDTO.profilePictureUrl ||
                    `${process.env.PUBLIC_URL}/avatar.jpeg`
                  }
                  alt={worker.userDTO.firstName}
                  sx={{
                    width: 90,
                    height: 90,
                    borderRadius: 2,
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                {/* TEXT CONTENT */}
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      wordBreak: "break-word",
                    }}
                  >
                    {worker.userDTO.firstName} {worker.userDTO.lastName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {worker.skill}
                  </Typography>

                  <Typography variant="body2" color="primary">
                    ⭐ {worker.ratings}
                  </Typography>
                </Box>

                {/* BUTTON */}
                <Button
                  fullWidth={isMobile}
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    navigate(
                      `/handyhub/workers/profile/${worker.id}?category=${categoryId}&subcategory=${selectedSub || 0}`
                    )
                  }
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
