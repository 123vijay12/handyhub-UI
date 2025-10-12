// layouts/MainLayout.jsx
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const STORAGE_KEY = "sidebar:collapsed";

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

  const sidebarWidth = useMemo(() => (collapsed ? 74 : 256), [collapsed]);

  return (
    <div
      className="min-h-screen flex bg-gray-100 overflow-hidden"
      style={{ "--sidebar-w": `${sidebarWidth}px` }}
    >
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 h-screen">
        {/* Optional: small CSS to apply margin-left at lg breakpoint */}
        <style>{`
          @media (min-width: 1024px) {
            .with-sidebar-offset { margin-left: var(--sidebar-w); }
          }
        `}</style>

        {/* Navbar */}
        <div className="sticky top-0 z-30">
          <Navbar setSidebarOpen={setSidebarOpen} sidebarWidth={sidebarWidth} />
        </div>

        {/* Outlet with translucent gradient */}
        <main className="flex-1 overflow-y-auto with-sidebar-offset p-4">
          <div
            className="rounded-2xl shadow-lg
                       bg-gradient-to-r from-gray-800/40 via-gray-500/30 to-gray-800/40
                       text-white min-h-[80vh] backdrop-blur-sm mt-10"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
