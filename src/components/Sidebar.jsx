import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // You can use Heroicons, FontAwesome, or Lucide

import {
  LayoutDashboard,
  Users,
  Boxes,
  UserCircle,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div style={{ height: 'inherit' }}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-between items-center px-4 py-3 lg:hidden border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)} className="text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      <div className="p-4 text-xl font-bold flex items-center gap-2">
        <UserCircle className="w-6 h-6 text-white" />
        HandyHub
      </div>

      <nav className="flex flex-col px-4">
        <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>

        {/* Group dropdown */}
        <div className="group">
          <div className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5" />
              Manage
            </div>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
          </div>

          <div className="hidden group-hover:flex flex-col pl-8 text-sm mt-1">
            <Link to="/users" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </Link>
            <Link to="/products" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
              <Boxes className="w-4 h-4" />
              Products
            </Link>
          </div>
        </div>

        <Link to="/profile" className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2">
          <UserCircle className="w-5 h-5" />
          Profile
        </Link>
      </nav>
    </div>
    </>
  );
  
}
