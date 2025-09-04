import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'; // 👈 Import this

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar - fixed on left */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 lg:ml-64 h-screen">
        {/* Navbar - fixed at top inside main */}
        <div className="sticky top-0 z-30 p-6 mt-16 overflow-y-auto">
          <Navbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* 👈 This renders the nested routes */}
        </main>
      </div>
    </div>
  );
}
