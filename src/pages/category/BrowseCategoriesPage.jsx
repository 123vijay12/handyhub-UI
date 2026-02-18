import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../api/categoryApi";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

const dummyCategories = [
  {
    categoryId: 1,
    categoryName: "Category 1",
    categoryDescription: "Description for Category 1",
    imageUrl: "https://example.com/category1.jpg",
  },
  {
    categoryId: 2,
    categoryName: "Category 2",
    categoryDescription: "Description for Category 2",
    imageUrl: "https://example.com/category2.jpg",
  },
  {
    categoryId: 3,
    categoryName: "Category 3",
    categoryDescription: "Description for Category 3",
    imageUrl: "https://example.com/category3.jpg",
  },
  {
    categoryId: 4,
    categoryName: "Category 4",
    categoryDescription: "Description for Category 4",
    imageUrl: "https://example.com/category4.jpg",
  },
  {
    categoryId: 5,
    categoryName: "Category 5",
    categoryDescription: "Description for Category 5",
    imageUrl: "https://example.com/category5.jpg",
  },
  {
    categoryId: 6,
    categoryName: "Category 6",
    categoryDescription: "Description for Category 6",
    imageUrl: "https://example.com/category6.jpg",
  },
];

export default function BrowseCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data || []));
  }, []);

  return (
    <Box p={{ xs: 2, sm: 3, md: 5 }} bgcolor="#f9f9f9">
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Explore Categories
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cat.categoryId}>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.03)",
                },
              }}
              onClick={() =>
                navigate(`/handyhub/browse/categories/${cat.categoryId}/subcategories`)
              }
            >
              {/* Image Section */}
              <Box
                component="img"
                src={cat.imageUrl || "/placeholder.png"} // fallback image
                alt={cat.categoryName}
                sx={{
                  width: "100%",
                  height: { xs: 150, sm: 180, md: 200 },
                  objectFit: "cover",
                }}
              />

              {/* Card Content */}
              <CardContent sx={{ backgroundColor: "#fff" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 1, textAlign: "center" }}
                >
                  {cat.categoryName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  {cat.categoryDescription}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
