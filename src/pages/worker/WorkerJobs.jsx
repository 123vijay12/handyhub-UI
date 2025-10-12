import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Avatar, Tabs, Tab } from "@mui/material";
import { getBookingsByWorker, updateBookingStatus } from "../../api/bookingApi";
import BookingCardList from "../../components/booking/BookingCardList";
import BookingDrawer from "../../components/booking/BookingDrawer";
import { mapBooking } from "../../components/util/mapBooking";

export default function WorkerJobs() {
  const [tab, setTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const workerId = localStorage.getItem("userId");

  const fetchData = () =>
    getBookingsByWorker(workerId).then((res) => setBookings(res.data || []));

useEffect(() => {
  if (workerId)
    getBookingsByWorker(workerId)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setBookings(list.map((b) => mapBooking(b, "worker")));
      })
      .catch(console.error);
}, [workerId]);


  const requests = bookings.filter((b) => b.status === "PENDING");
  const accepted = bookings.filter((b) =>
    ["ACCEPTED", "COMPLETED"].includes(b.status)
  );

  const handleAccept = (b) =>
    updateBookingStatus(b.id, "ACCEPTED").then(fetchData);

  const handleReject = (b) =>
    updateBookingStatus(b.id, "REJECTED").then(fetchData);

  return (
    <Box sx={{ bgcolor: "#f6f7fb", minHeight: "100vh" }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Worker Jobs
          </Typography>
          <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>W</Avatar>
        </Toolbar>
      </AppBar>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Requests" />
        <Tab label="Accepted" />
      </Tabs>

      <Box sx={{ p: 2 }}>
        {tab === 0 && (
          <BookingCardList
            bookings={requests}
            role="worker"
            onView={(b) => {
              setSelected(b);
              setOpen(true);
            }}
            onPrimary={handleAccept}
            onSecondary={handleReject}
          />
        )}
        {tab === 1 && (
          <BookingCardList
            bookings={accepted}
            role="worker"
            onView={(b) => {
              setSelected(b);
              setOpen(true);
            }}
          />
        )}
      </Box>

      <BookingDrawer
        open={open}
        onClose={() => setOpen(false)}
        booking={selected}
      />
    </Box>
  );
}
