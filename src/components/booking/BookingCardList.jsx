// src/components/booking/BookingCardList.jsx
import { Stack, Card, CardContent, Typography } from "@mui/material";
import BookingCard from "./BookingCard";

export default function BookingCardList({
  bookings = [],
  role = "user",
  onView,
  onPrimary,
  onSecondary,
}) {
  if (!bookings?.length)
    return (
      <Card sx={{ borderRadius: 2, border: "1px dashed", borderColor: "divider" }}>
        <CardContent sx={{ textAlign: "center", color: "text.secondary" }}>
          No bookings found.
        </CardContent>
      </Card>
    );


  return (
    <Stack spacing={2}>
      {bookings.map((b) => (
        <BookingCard
          key={b.id}
          booking={b}
          role={role}
          onView={() => onView(b)}
          onPrimary={onPrimary ? () => onPrimary(b) : null}
          onSecondary={onSecondary ? () => onSecondary(b) : null}
        />
      ))}
    </Stack>
  );
}
