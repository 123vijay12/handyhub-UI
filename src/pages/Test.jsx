import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box
} from "@mui/material";

const images = [
  // Wide landscape
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",

  // Tall portrait
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600",

  // Square
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800",

  // Ultra wide
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600",

  // Very tall
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=900",

  // Small image
  "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=400",
];

export default function Test() {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
        Equal Grid Cards
      </Typography>

      <Grid container spacing={3}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: "100%",          // ✅ equal height
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#111",
                color: "#fff",
              }}
            >
              {/* Image wrapper (fixed height) */}
              <Box
                sx={{
                  height: 180,           // ✅ same image height
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#000",
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt="sample"
                  sx={{
                    maxHeight: "100%",
                    maxWidth: "100%"
                    
                  }}
                />
              </Box>

              {/* Content grows equally */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">
                  Card {index + 1}
                </Typography>
                <Typography variant="body2" sx={{ color: "#bbb" }}>
                  Image aspect ratio does not affect layout.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
