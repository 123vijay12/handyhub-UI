// src/Context/BookingStore.js
import React, { createContext, useContext, useMemo, useState } from "react";

// Simulated identities for demo
const CURRENT_USER_ID = "user-1";
const CURRENT_WORKER_ID = "worker-1";

/**
 * Seed with your extended fields.
 * Notes:
 * - photos are simple URLs (you can switch to your CDN later).
 * - geo is { lat, lng } for future map preview.
 * - termsAcceptedAt and other booleans/strings set to realistic values.
 */
const seed = [
  {
    id: "b1",
    userId: "user-1",
    userName: "Priya",
    workerId: "worker-1",
    workerName: "Arun Kumar",
    service: { category: "Electrician", subcategory: "Fan Repair" },
    datetime: "2025-10-12 15:00",
    address: "12, MG Road, Chennai",
    price: 500,
    status: "Pending", // Pending | Accepted | Completed | Rejected
    description: "Ceiling fan wobbling and making noise.",
    // Extended fields:
    contactPhone: "+91 90000 11111",
    geo: { lat: 13.0827, lng: 80.2707 },
    priority: "SCHEDULED",
    photos: [
      "https://via.placeholder.com/120x90?text=Fan",
      "https://via.placeholder.com/120x90?text=Switch",
    ],
    paymentMethod: "UPI",
    couponCode: "DIWALI10",
    materialsProvidedBy: "CUSTOMER",
    expectedDurationMins: 60,
    accessNotes: "4th floor, no lift. Ask for security at gate ‘A’.",
    languagePref: "EN",
    billing: { needGSTInvoice: true, gstNumber: "33ABCDE1234F1Z5", companyName: "Priya Ventures" },
    consentToSharePhone: true,
    alternateContactName: "Ramesh",
    alternateContactPhone: "+91 90000 22222",
    serviceLocationType: "HOME",
    termsAcceptedAt: "2025-10-10T12:30:00Z",
    // Ratings
    ratingByUser: 0,
    ratingByWorker: 0,
  },
  {
    id: "b2",
    userId: "user-1",
    userName: "Priya",
    workerId: "worker-1",
    workerName: "Arun Kumar",
    service: { category: "Plumbing", subcategory: "Pipe Leak" },
    datetime: "2025-10-12 18:30",
    address: "12, MG Road, Chennai",
    price: 700,
    status: "Accepted",
    description: "Under-sink leak; water dripping constantly.",
    contactPhone: "+91 90000 11111",
    geo: { lat: 13.0827, lng: 80.2707 },
    priority: "URGENT",
    photos: ["https://via.placeholder.com/120x90?text=Leak"],
    paymentMethod: "CASH",
    couponCode: null,
    materialsProvidedBy: "WORKER",
    expectedDurationMins: 90,
    accessNotes: "Call when outside; dog at home.",
    languagePref: "HI",
    billing: { needGSTInvoice: false },
    consentToSharePhone: true,
    alternateContactName: "",
    alternateContactPhone: "",
    serviceLocationType: "HOME",
    termsAcceptedAt: "2025-10-11T09:00:00Z",
    ratingByUser: 0,
    ratingByWorker: 0,
  },
  {
    id: "b3",
    userId: "user-2",
    userName: "Anita",
    workerId: "worker-1",
    workerName: "Arun Kumar",
    service: { category: "Cleaning", subcategory: "Kitchen Deep Clean" },
    datetime: "2025-10-13 10:00",
    address: "22, Anna Nagar, Chennai",
    price: 900,
    status: "Accepted",
    description: "Grease build-up; need detailed cleaning.",
    contactPhone: "+91 98888 33333",
    geo: { lat: 13.0878, lng: 80.2785 },
    priority: "FLEXIBLE",
    photos: [],
    paymentMethod: "CARD",
    couponCode: "NEWUSER50",
    materialsProvidedBy: "CUSTOMER",
    expectedDurationMins: 120,
    accessNotes: "Parking available at basement B2.",
    languagePref: "TA",
    billing: { needGSTInvoice: true, gstNumber: "33ZZZAB9999L1Z1", companyName: "Anita Foods" },
    consentToSharePhone: false,
    alternateContactName: "Kavi",
    alternateContactPhone: "+91 98888 44444",
    serviceLocationType: "OFFICE",
    termsAcceptedAt: "2025-10-11T16:45:00Z",
    ratingByUser: 0,
    ratingByWorker: 0,
  },
];

const BookingCtx = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(seed);

  const actions = useMemo(
    () => ({
      accept(id) {
        setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: "Accepted" } : x)));
      },
      reject(id) {
        setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: "Rejected" } : x)));
      },
      complete(id) {
        setBookings((b) => b.map((x) => (x.id === id ? { ...x, status: "Completed" } : x)));
      },
      rateByUser(id, stars) {
        setBookings((b) => b.map((x) => (x.id === id ? { ...x, ratingByUser: stars } : x)));
      },
      rateByWorker(id, stars) {
        setBookings((b) => b.map((x) => (x.id === id ? { ...x, ratingByWorker: stars } : x)));
      },
    }),
    []
  );

  const derived = useMemo(() => {
    const userBookings = bookings.filter((b) => b.userId === CURRENT_USER_ID);
    const workerRequests = bookings.filter((b) => b.workerId === CURRENT_WORKER_ID && b.status === "Pending");
    const workerAccepted = bookings.filter(
      (b) => b.workerId === CURRENT_WORKER_ID && (b.status === "Accepted" || b.status === "Completed")
    );
    return { userBookings, workerRequests, workerAccepted };
  }, [bookings]);

  return (
    <BookingCtx.Provider
      value={{
        bookings,
        ...derived,
        actions,
        CURRENT_USER_ID,
        CURRENT_WORKER_ID,
      }}
    >
      {children}
    </BookingCtx.Provider>
  );
}

export const useBookingStore = () => useContext(BookingCtx);
