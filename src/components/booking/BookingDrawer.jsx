// src/components/booking/BookingDrawer.jsx
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Button,
  IconButton,
  Rating,
} from "@mui/material";
import {
  Person as PersonIcon,
  LocalPhone as LocalPhoneIcon,
  AccessTime as AccessTimeIcon,
  MonetizationOn as MonetizationOnIcon,
  LocationOn as LocationOnIcon,
  Info as InfoIcon,
  Language as LanguageIcon,
  LocalOffer as LocalOfferIcon,
  ReceiptLong as ReceiptLongIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Map as MapIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { PriorityChip, StatusChip } from "./BookingStatusChips";

export default function BookingDrawer({ open, onClose, booking, role = "user" }) {
  if (!booking) return null;
  const isWorker = role === "worker";

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: { xs: "75vh", sm: "70vh" },
          overflowY: "auto",
        },
      }}
    >
      <Box sx={{ p: 2, pb: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {booking.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              {booking.status && <StatusChip status={booking.status} />}
              {booking.priority && <PriorityChip priority={booking.priority} />}
            </Stack>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Person Info */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {isWorker ? "Customer Details" : "Worker Details"}
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={isWorker ? booking.userName : booking.workerName}
              secondary={isWorker ? "Customer" : "Worker"}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LocalPhoneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                booking.consentToSharePhone
                  ? booking.contactPhone
                  : "Hidden (privacy mode)"
              }
              secondary={booking.consentToSharePhone ? "Phone shared" : "Phone hidden"}
            />
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LanguageIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={booking.languagePref || "-"}
              secondary="Preferred Language"
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Job Info */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Job Information
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={booking.datetime || "-"}
              secondary={`Expected Duration: ${
                booking.expectedDurationMins || "-"
              } mins`}
            />
          </ListItem>

          {booking.description && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={booking.description} secondary="Description" />
            </ListItem>
          )}

          {booking.materialsProvidedBy && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ReceiptLongIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={`Materials by ${booking.materialsProvidedBy}`}
                secondary="Responsibility"
              />
            </ListItem>
          )}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Location Info */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Location Details
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LocationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={booking.address}
              secondary={`Type: ${booking.serviceLocationType || "-"}`}
            />
          </ListItem>

          {booking.geo?.lat && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <MapIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={`Pin: ${booking.geo.lat}, ${booking.geo.lng}`}
                secondary="Geo Coordinates"
              />
            </ListItem>
          )}

          {booking.accessNotes && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <InfoIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={booking.accessNotes} secondary="Access Notes" />
            </ListItem>
          )}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Payment & Billing */}
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Payment & Billing
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <MonetizationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={`₹${booking.price || 0}`}
              secondary={`Method: ${booking.paymentMethod || "-"}`}
            />
          </ListItem>

          {booking.couponCode && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LocalOfferIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={booking.couponCode}
                secondary="Coupon Applied"
              />
            </ListItem>
          )}

          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {booking.needGSTInvoice ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <LockIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                booking.needGSTInvoice
                  ? `GST Invoice: ${booking.companyName || ""}`
                  : "No GST Invoice"
              }
              secondary={booking.gstNumber || ""}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Footer Actions */}
        {isWorker && (
          <Stack direction="row" spacing={1.5}>
            {booking.status === "PENDING" && (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={() => alert("Accept Booking")}
                >
                  Accept
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => alert("Reject Booking")}
                >
                  Reject
                </Button>
              </>
            )}
            {booking.status === "ACCEPTED" && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => alert("Mark Completed")}
              >
                Mark Completed
              </Button>
            )}
          </Stack>
        )}

        {!isWorker && booking.status === "COMPLETED" && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Rate your experience
            </Typography>
            <Rating
              name="user-rating"
              onChange={() => alert("Thanks for your feedback!")}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => alert("Submitted")}
            >
              Submit Rating
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
