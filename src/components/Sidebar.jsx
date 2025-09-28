import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // icons
import {
  LayoutDashboard,
  Users,
  Boxes,
  UserCircle,
  ChevronDown,
} from 'lucide-react';

// Get roles from localStorage (as array of uppercase strings)
const roles = JSON.parse(localStorage.getItem('roles'))?.map(r => r.toUpperCase()) || [];

// Helper: check if user roles intersect with allowedRoles
const hasAccess = (allowedRoles = []) => {
  if (allowedRoles.length === 0) return true; // no restriction
  return roles.some(role => allowedRoles.includes(role));
};

// Define sidebar items with allowedRoles added
const navItems = [
  {
    type: 'link',
    to: '/',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'USER'],
  },
  {
    type: 'dropdown',
    label: 'Manage',
    icon: <Boxes className="w-5 h-5" />,
    allowedRoles: ['ADMIN'], // only admin can see Manage
    children: [
      {
        to: '/users',
        label: 'Users',
        icon: <Users className="w-4 h-4" />,
        allowedRoles: ['ADMIN'],
      },
      {
        to: '/categories',
        label: 'Service',
        icon: <Boxes className="w-4 h-4" />,
        allowedRoles: ['ADMIN', 'EMPLOYEE'],
      },
    ],
  },
  // ---------- New Nav Item for Users ----------
  {
    type: 'dropdown', // dropdown makes sense since you will select category first
    label: 'Find Workers', // clear name for users
    icon: <Users className="w-5 h-5" />,
    allowedRoles: ['ADMIN','USER'], // normal users
    children: [
      {
        to: '/browse/categories', // first select category
        label: 'Categories',
        icon: <Boxes className="w-4 h-4" />,
        allowedRoles: ['ADMIN','USER'],
      },
      {
        to: '/browse/workers', // then show list of workers
        label: 'Workers',
        icon: <UserCircle className="w-4 h-4" />,
        allowedRoles: ['ADMIN','USER'],
      },
    ],
  },
  {
    type: 'link',
    to: '/profile',
    label: 'Profile',
    icon: <UserCircle className="w-5 h-5" />,
    allowedRoles: ['ADMIN', 'EMPLOYEE', 'USER'],
  }
];


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

      <div
        style={{ height: 'inherit' }}
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
          {navItems.map((item, idx) => {
            if (!hasAccess(item.allowedRoles)) return null;

            if (item.type === 'link') {
              return (
                <Link
                  key={idx}
                  to={item.to}
                  className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            } else if (item.type === 'dropdown') {
              // Filter children by roles too
              const filteredChildren = item.children.filter(child =>
                hasAccess(child.allowedRoles)
              );
              if (filteredChildren.length === 0) return null;

              return (
                <div key={idx} className="group">
                  <div className="hover:bg-gray-700 px-3 py-2 rounded cursor-pointer flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      {item.label}
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </div>

                  <div className="hidden group-hover:flex flex-col pl-8 text-sm mt-1">
                    {filteredChildren.map((child, cidx) => (
                      <Link
                        key={cidx}
                        to={child.to}
                        className="hover:bg-gray-700 px-3 py-2 rounded flex items-center gap-2"
                      >
                        {child.icon}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </nav>
      </div>
    </>
  );
}
