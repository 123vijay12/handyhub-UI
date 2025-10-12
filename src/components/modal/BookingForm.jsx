import React, { useState, useMemo } from "react";
import {
  Drawer,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

/**
 * Full booking drawer to capture all booking fields.
 */
export default function BookingDrawerFull({
  open,
  onClose,
  worker,
  categoryId,
  subcategoryId,
  onSubmit,
}) {
  const [form, setForm] = useState({
    scheduledStartTime: null,
    scheduledEndTime: null,
    address: worker?.address || "",
    description: "",
    estimatedPrice: worker?.hourlyRate || "",
    contactPhone: "",
    priority: "SCHEDULED",
    latitude: "",
    longitude: "",
    paymentMethod: "CASH",
    couponCode: "",
    materialsProvidedBy: "CUSTOMER",
    expectedDurationMins: "",
    accessNotes: "",
    languagePref: "EN",
    needGSTInvoice: false,
    gstNumber: "",
    companyName: "",
    consentToSharePhone: true,
    alternateContactName: "",
    alternateContactPhone: "",
    serviceLocationType: "HOME",
    termsAcceptedAt: dayjs(),
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const title = useMemo(
    () => `Book ${worker?.name || "Worker"}`,
    [worker?.name]
  );

  const setField = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.scheduledStartTime) e.scheduledStartTime = "Required";
    if (!form.scheduledEndTime) e.scheduledEndTime = "Required";
    if (!form.address) e.address = "Required";
    if (!form.contactPhone) e.contactPhone = "Required";
    if (!form.estimatedPrice || isNaN(form.estimatedPrice))
      e.estimatedPrice = "Valid price required";
    if (!form.expectedDurationMins || isNaN(form.expectedDurationMins))
      e.expectedDurationMins = "Duration required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toISO = (v) => (v ? dayjs(v).toISOString() : null);

  const handleSubmit = async () => {
    if (!validate()) return;
    const customerId = Number(localStorage.getItem("userId"));
    if (!customerId) {
      setApiError("Please sign in to continue");
      return;
    }

    const payload = {
      customerId,
      workerId: worker?.id,
      categoryId: Number(categoryId),
      subcategoryId: Number(subcategoryId),
      scheduledStartTime: toISO(form.scheduledStartTime),
      scheduledEndTime: toISO(form.scheduledEndTime),
      address: form.address.trim(),
      description: form.description,
      estimatedPrice: Number(form.estimatedPrice),

      contactPhone: form.contactPhone,
      priority: form.priority,
      latitude: Number(form.latitude || 0),
      longitude: Number(form.longitude || 0),
      paymentMethod: form.paymentMethod,
      couponCode: form.couponCode || null,
      materialsProvidedBy: form.materialsProvidedBy,
      expectedDurationMins: Number(form.expectedDurationMins),
      accessNotes: form.accessNotes,
      languagePref: form.languagePref,
      needGSTInvoice: !!form.needGSTInvoice,
      gstNumber: form.gstNumber || null,
      companyName: form.companyName || null,
      consentToSharePhone: !!form.consentToSharePhone,
      alternateContactName: form.alternateContactName || null,
      alternateContactPhone: form.alternateContactPhone || null,
      serviceLocationType: form.serviceLocationType,
      termsAcceptedAt: toISO(form.termsAcceptedAt),
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
      setSubmitting(false);
      onClose();
    } catch (err) {
      setSubmitting(false);
      setApiError(
        err?.response?.data?.message || "Failed to create booking. Try again."
      );
    }
  };

  const reset = () => {
    setErrors({});
    setApiError("");
    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={reset}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "90vh",
          overflowY: "auto",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h6" fontWeight={700}>
            {title}
          </Typography>
          <IconButton onClick={reset}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Schedule
            </Typography>
            <DateTimePicker
              label="Start Time *"
              value={form.scheduledStartTime}
              onChange={(v) => setField("scheduledStartTime", v)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.scheduledStartTime,
                  helperText: errors.scheduledStartTime,
                },
              }}
            />
            <DateTimePicker
              label="End Time *"
              value={form.scheduledEndTime}
              onChange={(v) => setField("scheduledEndTime", v)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.scheduledEndTime,
                  helperText: errors.scheduledEndTime,
                },
              }}
            />

            <Typography variant="subtitle1" fontWeight={600}>
              Location & Description
            </Typography>
            <TextField
              label="Address *"
              fullWidth
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Description"
              multiline
              minRows={2}
              fullWidth
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />

            <Typography variant="subtitle1" fontWeight={600}>
              Pricing & Priority
            </Typography>
            <TextField
              label="Estimated Price (₹) *"
              type="number"
              fullWidth
              value={form.estimatedPrice}
              onChange={(e) => setField("estimatedPrice", e.target.value)}
              error={!!errors.estimatedPrice}
              helperText={errors.estimatedPrice}
            />
            <TextField
              select
              label="Priority *"
              fullWidth
              value={form.priority}
              onChange={(e) => setField("priority", e.target.value)}
            >
              {["URGENT", "SCHEDULED", "FLEXIBLE"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle1" fontWeight={600}>
              Contact & Access
            </Typography>
            <TextField
              label="Primary Contact *"
              fullWidth
              value={form.contactPhone}
              onChange={(e) => setField("contactPhone", e.target.value)}
              error={!!errors.contactPhone}
              helperText={errors.contactPhone}
            />
            <TextField
              label="Alternate Contact Name"
              fullWidth
              value={form.alternateContactName}
              onChange={(e) => setField("alternateContactName", e.target.value)}
            />
            <TextField
              label="Alternate Contact Phone"
              fullWidth
              value={form.alternateContactPhone}
              onChange={(e) =>
                setField("alternateContactPhone", e.target.value)
              }
            />
            <TextField
              label="Access Notes"
              fullWidth
              value={form.accessNotes}
              onChange={(e) => setField("accessNotes", e.target.value)}
            />

            <Typography variant="subtitle1" fontWeight={600}>
              Location Details
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Latitude"
                type="number"
                value={form.latitude}
                onChange={(e) => setField("latitude", e.target.value)}
              />
              <TextField
                label="Longitude"
                type="number"
                value={form.longitude}
                onChange={(e) => setField("longitude", e.target.value)}
              />
            </Stack>
            <TextField
              select
              label="Service Location Type"
              fullWidth
              value={form.serviceLocationType}
              onChange={(e) => setField("serviceLocationType", e.target.value)}
            >
              {["HOME", "OFFICE", "OTHER"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle1" fontWeight={600}>
              Work Details
            </Typography>
            <TextField
              label="Expected Duration (mins) *"
              type="number"
              fullWidth
              value={form.expectedDurationMins}
              onChange={(e) => setField("expectedDurationMins", e.target.value)}
              error={!!errors.expectedDurationMins}
              helperText={errors.expectedDurationMins}
            />
            <TextField
              select
              label="Materials Provided By"
              fullWidth
              value={form.materialsProvidedBy}
              onChange={(e) => setField("materialsProvidedBy", e.target.value)}
            >
              {["CUSTOMER", "WORKER"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Language Preference"
              fullWidth
              value={form.languagePref}
              onChange={(e) => setField("languagePref", e.target.value)}
            >
              {["EN", "HI", "TA"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="subtitle1" fontWeight={600}>
              Payment & GST
            </Typography>
            <TextField
              select
              label="Payment Method"
              fullWidth
              value={form.paymentMethod}
              onChange={(e) => setField("paymentMethod", e.target.value)}
            >
              {["CASH", "UPI", "CARD", "WALLET"].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Coupon Code"
              fullWidth
              value={form.couponCode}
              onChange={(e) => setField("couponCode", e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.needGSTInvoice}
                  onChange={(e) => setField("needGSTInvoice", e.target.checked)}
                />
              }
              label="Need GST Invoice"
            />
            {form.needGSTInvoice && (
              <>
                <TextField
                  label="GST Number"
                  fullWidth
                  value={form.gstNumber}
                  onChange={(e) => setField("gstNumber", e.target.value)}
                />
                <TextField
                  label="Company Name"
                  fullWidth
                  value={form.companyName}
                  onChange={(e) => setField("companyName", e.target.value)}
                />
              </>
            )}

            <Typography variant="subtitle1" fontWeight={600}>
              Privacy & Terms
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.consentToSharePhone}
                  onChange={(e) =>
                    setField("consentToSharePhone", e.target.checked)
                  }
                />
              }
              label="Consent to share phone with worker"
            />
            <DateTimePicker
              label="Terms Accepted At"
              value={form.termsAcceptedAt}
              onChange={(v) => setField("termsAcceptedAt", v)}
            />
            {apiError && <Alert severity="error">{apiError}</Alert>}

            <Divider sx={{ mt: 2, mb: 1 }} />
            <Stack direction="row" spacing={1}>
              <Button fullWidth onClick={reset}>
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Confirm Booking"}
              </Button>
            </Stack>
          </Stack>
        </LocalizationProvider>
      </Box>
    </Drawer>
  );
}
