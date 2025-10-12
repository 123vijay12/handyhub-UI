// src/components/booking/BookingStatusChips.jsx
import { Chip } from "@mui/material";

export const StatusChip = ({ status }) => {
  const map = {
    PENDING: { color: "warning", label: "Pending" },
    ACCEPTED: { color: "info", label: "Accepted" },
    COMPLETED: { color: "success", label: "Completed" },
    REJECTED: { color: "default", label: "Rejected" },
  };
  const s = map[status] || { color: "default", label: status };
  return <Chip size="small" color={s.color} label={s.label} variant="outlined" />;
};

export const PriorityChip = ({ priority }) => {
  const map = {
    URGENT: { color: "error", label: "Urgent" },
    SCHEDULED: { color: "primary", label: "Scheduled" },
    FLEXIBLE: { color: "success", label: "Flexible" },
  };
  const p = map[priority] || { color: "default", label: priority };
  return <Chip size="small" color={p.color} label={p.label} variant="outlined" />;
};
