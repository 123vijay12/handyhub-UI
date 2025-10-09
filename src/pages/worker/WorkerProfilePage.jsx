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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getWorkerProfileById } from "../../api/workerProfileApi";
import { createBooking } from "../../api/bookingApi";
import DynamicModalForm from "../../components/modal/DynamicModalForm";
import BookingConfirmation from "../../components/modal/BookingConfirmation";

export default function WorkerProfilePage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openBooking, setOpenBooking] = useState(false);

  // Snackbar states
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  useEffect(() => {
    if (workerId) {
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
            address: data.userDTO.address || "N/A",
            state: data.userDTO.state || "N/A",
            country: data.userDTO.country || "N/A",
            skills: data.skills || [],
            feedbacks: data.ratings || [],
            pastWork: data.pastWork || [],
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
    worker.feedbacks && worker.feedbacks.length > 0
      ? worker.feedbacks.reduce((a, b) => a + b.rating, 0) / worker.feedbacks.length
      : 0;

  const getRatingColor = (rating) =>
    rating >= 4 ? "green" : rating >= 3 ? "orange" : "red";

  // Booking form configuration
  const bookingFormConfig = {
    title: `Book ${worker.name}`,
    sections: [
      {
        title: "Booking Details",
        fields: [
          { label: "Start Time", name: "scheduledStartTime", type: "datetime", required: true },
          { label: "End Time", name: "scheduledEndTime", type: "datetime", required: true },
          { label: "Address", name: "address", type: "text", defaultValue: worker.address, required: true },
          { label: "Description", name: "description", type: "textarea" },
          { label: "Estimated Price", name: "estimatedPrice", type: "number", defaultValue: worker.hourlyRate, required: true },
        ],
      },
    ],
    submitButton: { label: "Confirm Booking" },
  };

  // Booking submit handler
  const handleBookingSubmit = async (formData) => {
    const customerId = localStorage.getItem("userId");
    if (!customerId) return setBookingError(true);

    try {
      const payload = {
        customerId: Number(customerId),
        workerId: worker.id,
        subcategoryId: 12,
        ...formData,
      };
      await createBooking(payload);

      // optional success sound
    // Play confirmation sound from public folder
    const successSound = new Audio("/smile-ringtone.mp3"); // path relative to public
    successSound.play();

      setBookingSuccess(true);
      setOpenBooking(false);
    } catch (err) {
      console.error(err);
      setBookingError(true);
    }
  };

  return (
    <Box p={2}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        &larr; Back
      </Button>

      {/* User Profile */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
          <Avatar
            src={worker.profileImage}
            alt={worker.name}
            sx={{ width: 130, height: 130 }}
          />
          <Box flex={1} minWidth={200}>
            <Typography variant="h4" fontWeight="bold">{worker.name}</Typography>
            <Typography variant="h6" color="text.secondary">{worker.profession}</Typography>
            <Typography variant="body2" color="text.secondary">{worker.experience} experience</Typography>
            <Typography variant="body2" color="text.secondary">Service: {worker.serviceArea}</Typography>
            <Typography variant="body2" color="text.secondary">Hourly Rate: ${worker.hourlyRate}</Typography>
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
            onClick={() => setOpenBooking(true)}
          >
            Book Now
          </Button>
        </Box>
      </Paper>

      {/* Booking Modal */}
      <Dialog open={openBooking} onClose={() => setOpenBooking(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Book {worker.name}
          <IconButton
            aria-label="close"
            onClick={() => setOpenBooking(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DynamicModalForm
            open={openBooking}
            onClose={() => setOpenBooking(false)}
            config={bookingFormConfig}
            onSubmit={handleBookingSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Booking Success Snackbar */}
      <Snackbar
        open={bookingSuccess}
        autoHideDuration={4000}
        onClose={() => setBookingSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setBookingSuccess(false)}
          severity="success"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          Booking confirmed successfully!
        </Alert>
      </Snackbar>

    {bookingSuccess && (
  <BookingConfirmation
    open={bookingSuccess}
    message="Booking confirmed successfully!"
    onClose={() => setBookingSuccess(false)}
  />
)}

{bookingError && (
  <BookingConfirmation
    open={bookingError}
    message="Booking failed. Please try again."
    onClose={() => setBookingError(true)}
    type="error"
  />
)}


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

      {/* Ratings & Feedback */}
      {worker.feedbacks.length > 0 && (
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
      )}
    </Box>
  );
}
