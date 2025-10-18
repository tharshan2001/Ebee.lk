import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  PlusIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import Logout from "../components/Logout";

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { path: "/users", label: "Users", icon: <UsersIcon className="w-5 h-5" /> },
    {
      path: "/products/new",
      label: "Add Product",
      icon: <PlusIcon className="w-5 h-5" />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {!sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-gradient-to-b from-gray-900 to-gray-800 text-white 
          flex flex-col transition-all duration-300 ease-in-out
          shadow-xl border-r border-gray-700
          ${
            sidebarOpen
              ? "w-60 p-6 translate-x-0"
              : "w-16 p-3 -translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            sidebarOpen ? "justify-between mb-12" : "justify-center mb-8"
          }`}
        >
          {sidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AdminPanel
              </h2>
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-105 ${
              sidebarOpen ? "p-2.5" : "p-2"
            }`}
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="w-4 h-4" />
            ) : (
              <Bars3Icon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group flex items-center relative overflow-hidden
                  transition-all duration-200
                  ${
                    sidebarOpen
                      ? "px-4 py-3 rounded-2xl"
                      : "p-3 rounded-xl justify-center"
                  }
                  ${
                    isActive
                      ? sidebarOpen
                        ? "bg-blue-600/20 text-blue-400 border-r-2 border-blue-400 shadow-lg"
                        : "bg-blue-600/30 text-blue-300 shadow-md"
                      : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                  }
                `}
                title={sidebarOpen ? "" : item.label}
              >
                {/* Active indicator for collapsed state */}
                {!sidebarOpen && isActive && (
                  <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl" />
                )}

                {/* Active indicator for expanded state */}
                {sidebarOpen && isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full" />
                )}

                <span
                  className={`
                  flex-shrink-0 transition-transform duration-200 z-10
                  ${isActive ? "scale-110" : "group-hover:scale-110"}
                  ${
                    isActive
                      ? sidebarOpen
                        ? "text-blue-400"
                        : "text-blue-300"
                      : ""
                  }
                `}
                >
                  {item.icon}
                </span>

                {sidebarOpen && (
                  <span
                    className={`
                    ml-4 font-medium transition-all duration-200 z-10
                    ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "group-hover:translate-x-1"
                    }
                  `}
                  >
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}

                {/* Hover effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div
          className={`mt-auto pt-4 border-t border-gray-700/50 ${
            sidebarOpen ? "" : "flex justify-center"
          }`}
        >
          <Logout showIconOnly={!sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300
        ${sidebarOpen ? "lg:ml-0" : "lg:ml-0"}
      `}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              >
                <Bars3Icon className="w-5 h-5 text-gray-600" />
              </button>

              <h1 className="text-2xl font-semibold text-gray-900">
                {navItems.find((item) => item.path === item.path)?.label ||
                  "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-6">
              {/* Notifications */}
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group">
                <BellIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
                  3
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="relative">
                  <UserCircleIcon className="w-10 h-10 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
