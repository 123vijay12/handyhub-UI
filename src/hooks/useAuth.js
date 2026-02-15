// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../service/authService";


export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return { user, logout };
};
