import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-40">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:ml-64 h-screen">
        {/* Navbar */}
        <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md shadow-md">
          <Navbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Outlet with transparent RGB effect */}
        <main className="flex-1 overflow-y-auto">
            <div  className="rounded-2xl shadow-lg 
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
