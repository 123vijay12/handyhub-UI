import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import { getBookingsByCustomer } from "../../api/bookingApi";
import BookingCardList from "../../components/booking/BookingCardList";
import BookingDrawer from "../../components/booking/BookingDrawer";
import { mapBooking } from "../../components/util/mapBooking";

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const userId = localStorage.getItem("userId");

useEffect(() => {
  if (userId)
    getBookingsByCustomer(userId)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setBookings(list.map((b) => mapBooking(b, "user")));
      })
      .catch(console.error);
}, [userId]);


  return (
    <Box sx={{ bgcolor: "#f6f7fb", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            My Bookings
          </Typography>
          <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        <BookingCardList
          bookings={bookings}
          role="user"
          onView={(b) => {
            setSelected(b);
            setOpen(true);
          }}
        />
      </Box>

      <BookingDrawer
        open={open}
        onClose={() => setOpen(false)}
        booking={selected}
      />
    </Box>
  );
}
