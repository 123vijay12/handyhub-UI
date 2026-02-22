import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  CircularProgress,
  InputAdornment,
  CardMedia,
  Tooltip,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BuildIcon from "@mui/icons-material/Build";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import PaletteIcon from "@mui/icons-material/Palette";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { fetchCategories } from "../../api/categoryApi";

const categoryIcons = {
  "plumbing": <BuildIcon sx={{ fontSize: 32, color: '#f97316' }} />,
  "electrical": <ElectricBoltIcon sx={{ fontSize: 32, color: '#fbbf24' }} />,
  "cleaning": <LocalLaundryServiceIcon sx={{ fontSize: 32, color: '#06b6d4' }} />,
  "carpentry": <CarpenterIcon sx={{ fontSize: 32, color: '#8b5cf6' }} />,
  "painting": <PaletteIcon sx={{ fontSize: 32, color: '#ec4899' }} />,
  "hvac": <AcUnitIcon sx={{ fontSize: 32, color: '#0ea5e9' }} />,
};

// const getPlaceholderImage = (categoryName) => {
//   const categoryMap = {
//     "plumbing": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=300&fit=crop",
//     "electrical": "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=300&fit=crop",
//     "cleaning": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop",
//     "carpentry": "https://images.unsplash.com/photo-1576453345674-6762d53d0419?w=500&h=300&fit=crop",
//     "painting": "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&h=300&fit=crop",
//     "hvac": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=300&fit=crop",
//   };
//   return categoryMap[categoryName?.toLowerCase()] || "https://images.unsplash.com/photo-1584622181563-430f63602d4b?w=500&h=300&fit=crop";
// };

export default function BrowseCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data || []));
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (name) => {
    return categoryIcons[name?.toLowerCase()] || <BuildIcon sx={{ fontSize: 32, color: '#6b7280' }} />;
  };

  return (
    <Box>
      {/* Header Section */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Explore Services
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Browse thousands of professional services. Find exactly what you need.
        </Typography>

        {/* Search */}
        <TextField
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              color: 'text.primary',
            },
            '& .MuiOutlinedInput-input::placeholder': {
              opacity: 0.5,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Categories Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredCategories.length > 0 ? (
          <Grid container spacing={3} alignItems="stretch">
            {filteredCategories.map((cat) => (
              <Grid item xs={12} sm={6}md={4}lg={3}
                key={cat.categoryId}
                sx={{ display: "flex" }}
              >
                <Card sx={{ width: "100%", display: "flex",
                    flexDirection: "column",justifyContent: "space-between",
                    borderRadius: 3,overflow: "hidden",transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(249, 115, 22, 0.25)",
                      "& .category-image": {
                        transform: "scale(1.08)",
                      },
                      "& .category-overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={cat.imageUrl || "/placeholder.jpg"}
                      alt={cat.categoryName}
                      className="category-image"
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <Box
                      className="category-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                      px: 3,
                      py: 2.5,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          minHeight: 32,
                        }}
                      >
                        {cat.categoryName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          minHeight: 48,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {cat.categoryDescription ||
                          "Professional services in this category"}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() =>
                        navigate(
                          `/handyhub/browse/categories/${cat.categoryId}/subcategories`
                        )
                      }
                      sx={{
                        mt: 2,
                        alignSelf: "center",
                        fontWeight: 600,
                        "&:hover": {
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
      ) : (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            No services found
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 3 }}>
            No services found matching "{searchTerm}"
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </Button>
        </Paper>
      )}

      {/* Info Banner */}
      <Paper sx={{ p: 4, mt: 6, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Can't find what you're looking for?
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          Contact us for custom service requests.
        </Typography>
        <Button variant="contained" color="primary">
          Request a Service
        </Button>
      </Paper>
    </Box>
  );
}
