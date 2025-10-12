import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box, Grid, Card, Typography, Button, Avatar, Paper, Rating, Snackbar, Alert,
} from "@mui/material";
import { getWorkerProfileById } from "../../api/workerProfileApi";
import { createBooking } from "../../api/bookingApi";
import BookingDrawer from "../../components/modal/BookingForm";

export default function WorkerProfilePage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");
  const subcategoryId = queryParams.get("subcategory");

  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Snackbar
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    if (!workerId) return;
    setLoading(true);
    getWorkerProfileById(workerId)
      .then((res) => {
        const data = res.data;
        const mappedWorker = {
          id: data.id,
          name: `${data.userDTO.firstName || ""} ${data.userDTO.lastName || ""}`,
          profession: data.userDTO.rolesData?.[0]?.name || "Worker",
          experience: data.experience || "N/A",
          hourlyRate: data.hourlyRate || 0,
          serviceArea: data.serviceArea || data.userDTO.city || "Unknown",
          available: data.available,
          profileImage: data.userDTO.profilePictureUrl || "/avatar.jpeg",
          phone: data.userDTO.phone || "N/A",
          email: data.userDTO.email || "N/A",
          address: data.userDTO.address || "",
          state: data.userDTO.state || "N/A",
          country: data.userDTO.country || "N/A",
          skills: data.skills || [],
          feedbacks: data.ratings || [],
          pastWork: data.pastWork || [],
        };
        setWorker(mappedWorker);
      })
      .catch((err) => {
        console.error("Error fetching worker:", err);
        setWorker(null);
      })
      .finally(() => setLoading(false));
  }, [workerId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!worker) return <Typography>No worker found.</Typography>;

  const averageRating =
    worker.feedbacks?.length
      ? worker.feedbacks.reduce((a, b) => a + b.rating, 0) / worker.feedbacks.length
      : 0;

  const getRatingColor = (rating) => (rating >= 4 ? "green" : rating >= 3 ? "orange" : "red");

  // This is called by BookingDrawer on submit
  const submitBooking = async (payload) => {
    try {
      await createBooking(payload);

      // optional success sound
      const successSound = new Audio("/smile-ringtone.mp3");
      successSound.play().catch(() => {});

      setBookingError("");
      setBookingSuccess(true);
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      setBookingError(err?.response?.data?.message || "Booking failed. Please try again.");
      setBookingSuccess(false);
      throw err; // let drawer show inline error too if needed
    }
  };

  return (
    <Box p={2}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        &larr; Back
      </Button>

      {/* Worker Profile */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
          <Avatar src={worker.profileImage} alt={worker.name} sx={{ width: 130, height: 130 }} />
          <Box flex={1} minWidth={200}>
            <Typography variant="h4" fontWeight="bold">{worker.name}</Typography>
            <Typography variant="h6" color="text.secondary">{worker.profession}</Typography>
            <Typography variant="body2" color="text.secondary">{worker.experience} experience</Typography>
            <Typography variant="body2" color="text.secondary">Service: {worker.serviceArea}</Typography>
            <Typography variant="body2" color="text.secondary">Hourly Rate: ₹{worker.hourlyRate}</Typography>
            <Typography variant="body2" color={worker.available ? "green" : "red"} fontWeight="bold">
              {worker.available ? "Available" : "Not Available"}
            </Typography>
            {worker.feedbacks.length > 0 && (
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Rating
                  value={averageRating}
                  precision={0.1}
                  readOnly
                  sx={{ color: getRatingColor(averageRating) }}
                />
                <Typography variant="body2" color="text.secondary">
                  ({worker.feedbacks.length} reviews)
                </Typography>
              </Box>
            )}
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{ height: 40, whiteSpace: "nowrap" }}
            disabled={!worker.available}
            onClick={() => setDrawerOpen(true)}
          >
            Book Now
          </Button>
        </Box>
      </Paper>

      {/* Booking Drawer (Minimal Required Form) */}
      <BookingDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        worker={worker}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        onSubmit={submitBooking}
      />

      {/* Skills */}
      {worker.skills.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>Skills</Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {worker.skills.map((skill, idx) => (
              <Box key={idx} sx={{ p: 1, border: "1px solid #ccc", borderRadius: 1 }}>
                {skill}
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Past Work */}
      {worker.pastWork.length > 0 && (
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
      )}

      {/* Global Snackbars */}
      <Snackbar
        open={!!bookingError}
        autoHideDuration={4500}
        onClose={() => setBookingError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setBookingError("")} severity="error" sx={{ width: "100%", borderRadius: 2 }}>
          {bookingError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={bookingSuccess}
        autoHideDuration={3500}
        onClose={() => setBookingSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setBookingSuccess(false)} severity="success" sx={{ width: "100%", borderRadius: 2 }}>
          Booking confirmed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
