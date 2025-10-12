// src/api/bookingApi.js
import axios from "./axiosInstance";

// CREATE booking
export const createBooking = (data) => axios.post("/bookings", data);

// GET bookings by customer
export const getBookingsByCustomer = (customerId) =>
  axios.get(`/bookings/customer/${customerId}`);

// GET bookings by worker
export const getBookingsByWorker = (workerId) =>
  axios.get(`/bookings/worker/${workerId}`);

// PATCH - update status (Accept / Reject / Complete)
export const updateBookingStatus = (bookingId, status) =>
  axios.patch(`/bookings/${bookingId}/status`, null, { params: { status } });

// PATCH - cancel with reason
export const cancelBooking = (bookingId, reason) =>
  axios.patch(`/bookings/${bookingId}/cancel`, { reason });

// PATCH - partial update (price, paymentMethod, etc.)
export const updateBooking = (bookingId, payload) =>
  axios.patch(`/bookings/${bookingId}`, payload);
