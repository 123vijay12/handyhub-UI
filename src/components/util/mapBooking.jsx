// src/utils/bookingMapper.js
export const mapBooking = (b, role = "user") => {
  if (!b) return {};

  // --- Names ---
  const workerName =
    b.worker?.user?.firstName || b.worker?.userDTO?.firstName
      ? `${b.worker?.user?.firstName || b.worker?.userDTO?.firstName || ""} ${
          b.worker?.user?.lastName || b.worker?.userDTO?.lastName || ""
        }`.trim()
      : `Worker #${b.workerId || "?"}`;

  const customerName =
    b.customer?.firstName
      ? `${b.customer.firstName} ${b.customer.lastName || ""}`.trim()
      : `Customer #${b.customerId || "?"}`;

  // --- Service Title ---
  const title =
    [
      b.category?.name,
      b.serviceCategory?.name,
      b.subcategory?.name,
      b.service?.name,
    ]
      .filter(Boolean)
      .join(" / ") || "Service Booking";

  // --- Billing block ---
  const billing = {
    needGSTInvoice: !!b.needGSTInvoice,
    gstNumber:
      b.gstNumber || b.billing?.gstNumber || b.billingInfo?.gstNumber || "",
    companyName:
      b.companyName ||
      b.billing?.companyName ||
      b.billingInfo?.companyName ||
      "",
  };

  // --- Payment info ---
  const payment = {
    method: b.paymentMethod || b.payment?.method || "CASH",
    estimated: b.estimatedPrice || b.payment?.estimatedPrice || 0,
    final: b.finalPrice || b.payment?.finalPrice || null,
    coupon: b.couponCode || b.payment?.couponCode || "",
  };

  // --- Geo / location ---
  const geo = b.geo || {
    lat: b.latitude ?? b.location?.lat ?? null,
    lng: b.longitude ?? b.location?.lng ?? null,
  };

  // --- Core return ---
  return {
    id: b.id,
    title,
    status: b.status || "PENDING",
    priority: b.priority || "SCHEDULED",

    // People
    workerName,
    userName: customerName,
    contactPhone:
      b.contactPhone || b.customer?.phone || b.worker?.userDTO?.phone || "-",
    consentToSharePhone: b.consentToSharePhone ?? true,

    // Job details
    description: b.description || b.jobDescription || "-",
    expectedDurationMins: b.expectedDurationMins || "-",
    materialsProvidedBy: b.materialsProvidedBy || "CUSTOMER",
    languagePref: b.languagePref || "EN",

    // Location
    address:
      b.address ||
      b.jobAddress ||
      b.worker?.userDTO?.address ||
      b.customer?.address ||
      "-",
    geo,
    serviceLocationType: b.serviceLocationType || "HOME",
    accessNotes: b.accessNotes || "",

    // Timing
    scheduledStartTime: b.scheduledStartTime,
    scheduledEndTime: b.scheduledEndTime,
    datetime: b.scheduledStartTime
      ? new Date(b.scheduledStartTime).toLocaleString()
      : "-",

    // Payment
    paymentMethod: payment.method,
    estimatedPrice: payment.estimated,
    finalPrice: payment.final,
    price: payment.final ?? payment.estimated ?? 0,
    couponCode: payment.coupon,

    // Billing
    billing,
    needGSTInvoice: billing.needGSTInvoice,
    gstNumber: billing.gstNumber,
    companyName: billing.companyName,

    // Other
    termsAcceptedAt: b.termsAcceptedAt,
  };
};
