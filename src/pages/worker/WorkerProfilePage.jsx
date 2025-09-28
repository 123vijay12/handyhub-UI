import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  Typography,
  Button,
  Avatar,
  Paper,
  Rating,
} from "@mui/material";
import { getUserById } from "../../api/userApi";


export default function WorkerProfilePage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workerId) {
      getUserById(workerId)
        .then((res) => {
          const data = res.data;

          // Map API response to your UI structure
          const mappedWorker = {
            id: data.id,
            name: `${data.firstName} ${data.lastName}`,
            profession: data.rolesData?.[0]?.roleName || "Worker", // fallback if rolesData is empty
            experience: "5 years", // you may update if you have this info
            hourlyRate: 20, // you may fetch from another API if available
            serviceArea: data.city || "Unknown",
            available: data.active,
            profileImage: data.profilePictureUrl || "https://randomuser.me/api/portraits/men/32.jpg",
            feedbacks: [
              { user: "Amit", rating: 5, comment: "Excellent work!" },
              { user: "Sonia", rating: 4, comment: "Good and fast." },
              { user: "Ramesh", rating: 4.5, comment: "Very professional." },
              { user: "Kiran", rating: 3.5, comment: "Average, needs improvement" },
            ],
            pastWork: [
              { title: "AC Repair", location: "City Center" },
              { title: "Wiring Installation", location: "West End" },
              { title: "Fan Repair", location: "North Side" },
            ],
          };

          setWorker(mappedWorker);
        })
        .catch((err) => console.error("Error fetching worker:", err))
        .finally(() => setLoading(false));
    }
  }, [workerId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!worker) return <Typography>No worker found.</Typography>;

  const averageRating =
    worker.feedbacks.reduce((a, b) => a + b.rating, 0) / worker.feedbacks.length;

  const getRatingColor = (rating) =>
    rating >= 4 ? "green" : rating >= 3 ? "orange" : "red";

  return (
    <Box p={2}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        &larr; Back
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
          <Avatar src={worker.profileImage} alt={worker.name} sx={{ width: 130, height: 130 }} />
          <Box flex={1} minWidth={200}>
            <Typography variant="h4" fontWeight="bold">{worker.name}</Typography>
            <Typography variant="h6" color="text.secondary">{worker.profession}</Typography>
            <Typography variant="body2" color="text.secondary">{worker.experience} experience</Typography>
            <Typography variant="body2" color="text.secondary">Service: {worker.serviceArea}</Typography>
            <Typography variant="body2" color="text.secondary">Hourly Rate: ${worker.hourlyRate}</Typography>
            <Typography variant="body2" color={worker.available ? "green" : "red"} fontWeight="bold">
              {worker.available ? "Available" : "Not Available"}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Rating
                value={averageRating}
                precision={0.1}
                readOnly
                sx={{ color: getRatingColor(averageRating) }}
              />
              <Typography variant="body2" color="text.secondary">({worker.feedbacks.length} reviews)</Typography>
            </Box>
          </Box>
          <Button variant="contained" color="secondary" sx={{ height: 40, whiteSpace: "nowrap" }}>
            Book Now
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>Past Work</Typography>
        <Grid container spacing={1}>
          {worker.pastWork.map((work, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ p: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body1" fontWeight="bold">{work.title}</Typography>
                <Typography variant="body2" color="text.secondary">{work.location}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>Ratings & Feedback</Typography>
        <Grid container spacing={1}>
          {worker.feedbacks.map((fb, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  p: 1,
                  borderLeft: `5px solid ${getRatingColor(fb.rating)}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" fontWeight="bold">{fb.user}</Typography>
                  <Rating
                    value={fb.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ color: getRatingColor(fb.rating) }}
                  />
                </Box>
                <Typography variant="body2">{fb.comment}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
