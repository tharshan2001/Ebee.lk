import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import SidebarNavigation from "./SidebarNavigation";
import ProfileInfo from "./ProfileInfo";
import AddressSection from "./AddressSection";
import OrdersSection from "./OrdersSection";
import WishlistSection from "./WishlistSection";
import SecuritySection from "./SecuritySection";

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/me");
      if (data.success) setUser(data.user);
      else setError(data.msg || "Failed to fetch user");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile Info", icon: "👤" },
    { id: "address", label: "Address", icon: "📍" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchUserDetails} />;
  if (!user) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} />;
      case "address":
        return <AddressSection address={user.address} />;
      case "orders":
        return <OrdersSection />;
      case "wishlist":
        return <WishlistSection />;
      case "security":
        return <SecuritySection />;
      default:
        return <ProfileInfo user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, orders, and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarNavigation 
            user={user} 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-8">
                {renderActiveTab()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading your account...</p>
    </div>
  </div>
);

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-500 mb-4">{error}</p>
      <button 
        onClick={onRetry}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-xl transition-all duration-200 w-full"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default MyAccount;