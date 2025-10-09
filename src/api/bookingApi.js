// src/api/bookingApi.js
import axios from "./axiosInstance";

// POST - create a new booking
export const createBooking = (bookingData) => 
  axios.post("/bookings", bookingData);

// GET bookings by customer ID
export const getBookingsByCustomer = (customerId) => 
  axios.get(`/bookings/customer/${customerId}`);

// GET bookings by worker ID
export const getBookingsByWorker = (workerId) => 
  axios.get(`/bookings/worker/${workerId}`);

// PUT - update booking status
export const updateBookingStatus = (bookingId, status) => 
  axios.put(`/bookings/${bookingId}/status`, null, { params: { status } });
