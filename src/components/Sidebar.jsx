import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  Users,
  Boxes,
  UserCircle,
  ChevronDown,
  ChevronRight,
  PanelLeft,
} from "lucide-react";

const STORAGE_KEYS = { COLLAPSED: "sidebar:collapsed", OPEN_GROUPS: "sidebar:openGroups" };

const safeParseJSON = (s, fallback) => {
  try {
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
};

const cx = (...cls) => cls.filter(Boolean).join(" ");

const getRoles = () => {
  const stored = safeParseJSON(localStorage.getItem("roles"), []);
  return (Array.isArray(stored) ? stored : []).map((r) => String(r).toUpperCase());
};

const hasAccess = (userRoles, allowed = []) => 
  !allowed.length || userRoles.some((r) => allowed.includes(r));

const navItems = [
  {
    type: "link",
    to: "/handyhub/",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    allowedRoles: ["ADMIN", "EMPLOYEE", "USER"],
  },
  {
    type: "dropdown",
    label: "Manage",
    icon: <Boxes className="w-5 h-5" />,
    allowedRoles: ["ADMIN"],
    id: "manage",
    children: [
      { to: "/handyhub/employees", label: "Employees", icon: <Users className="w-4 h-4" />, allowedRoles: ["ADMIN"] },
      { to: "/handyhub/workers", label: "Workers", icon: <Users className="w-4 h-4" />, allowedRoles: ["ADMIN"] },
      { to: "/handyhub/categories", label: "Service", icon: <Boxes className="w-4 h-4" />, allowedRoles: ["ADMIN", "EMPLOYEE"] },
    ],
  },
  {
    type: "dropdown",
    label: "Find Workers",  
    icon: <Users className="w-5 h-5" />,
    allowedRoles: ["ADMIN", "USER"],
    id: "find-workers",
    children: [
      { to: "/handyhub/browse/categories", label: "Categories", icon: <Boxes className="w-4 h-4" />, allowedRoles: ["ADMIN", "USER"] },
      { to: "/handyhub/browse/workers", label: "Workers", icon: <UserCircle className="w-4 h-4" />, allowedRoles: ["ADMIN", "USER"] },
    ],
  },
  {
    type: "dropdown",
    label: "Bookings",
    icon: <LayoutDashboard className="w-5 h-5" />,
    allowedRoles: ["USER","ADMIN", "WORKER"],
    id: "bookings",
    children: [
      {
        to: "/handyhub/my-bookings",
        label: "My Bookings",
        icon: <UserCircle className="w-4 h-4" />,
        allowedRoles: ["USER","ADMIN"],
      },
      {
        to: "/handyhub/worker/jobs",
        label: "Worker Jobs",
        icon: <Users className="w-4 h-4" />,
        allowedRoles: ["WORKER", "ADMIN"],
      },
    ],
  },
  {
    type: "link",
    to: "/handyhub/profile",
    label: "Profile",
    icon: <UserCircle className="w-5 h-5" />,
    allowedRoles: ["ADMIN", "EMPLOYEE", "USER", "WORKER"],
  },
];


export default function Sidebar({ sidebarOpen, setSidebarOpen, collapsed: collapsedProp, onCollapsedChange }) {
  const location = useLocation();
  const roles = useMemo(() => getRoles(), []);

  const isControlled = typeof collapsedProp === "boolean";
  const [collapsedUncontrolled, setCollapsedUncontrolled] = useState(() =>
    safeParseJSON(localStorage.getItem(STORAGE_KEYS.COLLAPSED), false)
  );
  const collapsed = isControlled ? collapsedProp : collapsedUncontrolled;

  const [openGroups, setOpenGroups] = useState(() =>
    safeParseJSON(localStorage.getItem(STORAGE_KEYS.OPEN_GROUPS), {})
  );

  useEffect(() => {
    if (!isControlled) localStorage.setItem(STORAGE_KEYS.COLLAPSED, JSON.stringify(collapsed));
  }, [collapsed, isControlled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OPEN_GROUPS, JSON.stringify(openGroups));
  }, [openGroups]);

  useEffect(() => {
    if (sidebarOpen) setSidebarOpen(false);
  }, [location.pathname]);

  const toggleCollapsed = () => {
    if (isControlled) onCollapsedChange?.(!collapsed);
    else setCollapsedUncontrolled((c) => !c);
  };

  const toggleGroup = useCallback((id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const visibleNav = useMemo(() => {
    return navItems
      .filter((item) => hasAccess(roles, item.allowedRoles))
      .map((item) => {
        if (item.type === "dropdown") {
          const children = item.children.filter((c) => hasAccess(roles, c.allowedRoles));
          if (!children.length) return null;
          return { ...item, children };
        }
        return item;
      })
      .filter(Boolean);
  }, [roles]);

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + "/");

  useEffect(() => {
    visibleNav.forEach((item) => {
      if (item.type === "dropdown") {
        const groupId = item.id || item.label;
        const hasActiveChild = item.children.some((c) => isActive(c.to));
        if (hasActiveChild && !openGroups[groupId]) {
          setOpenGroups((prev) => ({ ...prev, [groupId]: true }));
        }
      }
    });
  }, [location.pathname, visibleNav]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cx(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cx(
          "fixed inset-y-0 left-0 h-screen z-50 text-white shadow-2xl transition-all duration-200 flex flex-col",
          collapsed ? "w-[74px]" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
                 style={{
            backgroundImage: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)'
          }}
          aria-label="Sidebar Navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-white/10 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur">
              <UserCircle className="w-5 h-5" />
            </div>
            {!collapsed && <div className="text-lg font-bold tracking-wide">LocalPro+</div>}
          </div>

          {/* Collapser */}
          <button
            onClick={toggleCollapsed}
            className={cx(
              "hidden lg:flex items-center justify-center rounded-md border border-white/20 hover:bg-white/10 transition-colors",
              collapsed ? "w-8 h-8" : "w-9 h-9"
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>

          {/* Close mobile */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md w-8 h-8 hover:bg-white/10"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation (scrolls independently) */}
          <nav className="flex-1 overflow-y-auto py-3 min-h-0 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">          <ul className="px-2 space-y-1">
            {visibleNav.map((item, idx) => {
              if (item.type === "link") {
                return (
                  <li key={`link-${idx}`}>
                    <Link
                      to={item.to}
                      className={cx(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ease-in-out transform",
                        isActive(item.to)
  ? "bg-white/30 text-white shadow-lg scale-[1.02]"
  : "text-white/80 hover:bg-white hover:text-orange-600 hover:scale-[1.03] hover:shadow-md"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.icon}
                      {!collapsed && <span className="flex-1 text-sm font-medium">{item.label}</span>}
                    </Link>
                  </li>
                );
              }

              const groupId = item.id || item.label;
              const open = !!openGroups[groupId];

              return (
                <li key={`group-${groupId}`}>
                  <button
                    onClick={() => toggleGroup(groupId)}
                    className={cx(
                      "w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200",
                      open?"bg-white/30 text-white": "text-white/80 hover:bg-white hover:text-orange-600 hover:scale-[1.02]"
                    )}
                    aria-expanded={open}
                  >
                    {item.icon}
                    {!collapsed && <span className="flex-1 text-sm font-medium">{item.label}</span>}
                    <ChevronDown className={cx("w-4 h-4 ml-auto transition-transform duration-300", open ? "rotate-180" : "rotate-0")} />
                  </button>

                  <div
                    className={cx(
                      "overflow-hidden transition-all duration-200",
                      collapsed ? "max-h-0" : open ? "max-h-40 mt-1" : "max-h-0"
                    )}
                  >
                    <ul className="pl-10 pr-2 py-1 space-y-1">
                      {item.children.map((child, cidx) => (
                        <li key={`child-${groupId}-${cidx}`}>
                          <Link
                            to={child.to}
                            className={cx(
                              "flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all duration-200",
                              isActive(child.to)
                              ? "bg-white/30 text-white"
                              : "text-white/70 hover:bg-white hover:text-orange-600 hover:scale-[1.02]"
                            )}
                          >
                            {child.icon}
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
       <div className="border-t border-white/30 p-3 bg-white/10 backdrop-blur-sm">
          {!collapsed ? (
            <div className="text-xs text-white/90">
              <div className="font-semibold text-white mb-1">Signed in</div>
              <div className="text-white/80 text-xs">
                {getRoles().join(", ") || "GUEST"}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-[10px] font-bold text-white">LP+</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
