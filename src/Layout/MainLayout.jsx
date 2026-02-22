// layouts/MainLayout.jsx
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const STORAGE_KEY = "sidebar:collapsed";
const COLLAPSE_WIDTH = 74;
const EXPAND_WIDTH = 256;

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "false");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      {/* Sidebar - Fixed positioned, doesn't take up space */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />

      {/* Main Content - Adjust padding-left on desktop only */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // On mobile (xs, sm): no margin (sidebar overlays)
          // On desktop (lg+): margin equals sidebar width
          ml: {
            xs: 0,
            sm: 0,
            lg: collapsed ? `${COLLAPSE_WIDTH}px` : `${EXPAND_WIDTH}px`,
          },
          transition: (theme) =>
            theme.transitions.create("margin-left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {/* Navbar */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            bgcolor: "background.default",
            pt: { xs: 8, sm: 9 },
            px: { xs: 2, sm: 3, md: 3, lg: 4 },
            py: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-start" },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { lg: "1280px" } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
