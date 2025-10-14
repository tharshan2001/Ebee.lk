// components/MyAccount/SidebarNavigation.jsx
import React from "react";

const SidebarNavigation = ({ user, tabs, activeTab, onTabChange }) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
        {/* User Profile Summary */}
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              user.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;