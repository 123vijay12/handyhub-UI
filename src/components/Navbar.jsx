import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';

export default function Navbar({ setSidebarOpen }) {
  return (
     <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md h-16 flex items-center px-4 lg:px-8 lg:ml-64">
      {/* Menu Button and Logo */}
      <div className="flex items-center flex-1">
        <button
          className="lg:hidden mr-3"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <span className="text-xl font-semibold text-gray-800">HandyHub</span>
      </div>

      {/* Right: Icons and Avatar */}
      <div className="flex items-center gap-4">
         <button className="hover:bg-gray-100 p-2 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="hover:bg-gray-100 p-2 rounded-full">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-9 h-9 rounded-full overflow-hidden ring ring-primary ring-offset-2">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
