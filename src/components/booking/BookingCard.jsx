// src/components/booking/BookingCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import {
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
} from "@mui/icons-material";
import { StatusChip, PriorityChip } from "./BookingStatusChips";

export default function BookingCard({
  booking,
  role = "user",
  onView,
  onPrimary,
  onSecondary,
}) {
  const isWorker = role === "worker";
  const showPrimary = !!onPrimary;
  const showSecondary = !!onSecondary;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {booking.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {booking.priority && <PriorityChip priority={booking.priority} />}
            {booking.status && <StatusChip status={booking.status} />}
          </Stack>
        </Stack>

        <Grid container spacing={1.2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <PersonIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                <b>{isWorker ? "Customer" : "Worker"}:</b>{" "}
                {isWorker ? booking.userName : booking.workerName}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {booking.datetime}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <MonetizationOnIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                ₹{booking.price}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button fullWidth variant="outlined" onClick={onView}>
            View
          </Button>
          {showPrimary && (
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={onPrimary}
            >
              Accept
            </Button>
          )}
          {showSecondary && (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={onSecondary}
            >
              Reject
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
