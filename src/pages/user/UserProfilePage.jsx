import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import UserProfile from "./UserProfile ";

const UserProfilePage = ({ userId: propUserId }) => {
  const { id: routeId } = useParams();        // from /users/profile/:id
  const { state } = useLocation();            // from navigate state

  const [user, setUser] = useState(state?.user || null);
  const [loading, setLoading] = useState(!state?.user);
  const [error, setError] = useState("");

  // 🔑 Resolve userId from all possible sources
  const resolvedUserId =
    propUserId ||
    routeId ||
    state?.user?.id ||
    localStorage.getItem("userId");

  useEffect(() => {
    if (!resolvedUserId) {
      setError("User ID not found. Please login again.");
      setLoading(false);
      return;
    }

    // If user already exists (passed via state), skip API
    if (user && String(user.id) === String(resolvedUserId)) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getUserById(resolvedUserId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load user profile");
      })
      .finally(() => setLoading(false));
  }, [resolvedUserId]);

  // ---------------- UI STATES ----------------

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return <UserProfile user={user} />;
};

export default UserProfilePage;
