// components/MyAccount/SecuritySection.jsx
import React from "react";

const SecuritySection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
      <div className="space-y-6">
        <SecurityCard
          title="Change Password"
          description="Update your password to keep your account secure"
          buttonText="Update Password"
          onAction={() => console.log("Update password clicked")}
          primary
        />
        
        <SecurityCard
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          buttonText="Enable 2FA"
          onAction={() => console.log("Enable 2FA clicked")}
        />
        
        <SecurityCard
          title="Active Sessions"
          description="Manage your logged-in devices"
          buttonText="View Sessions"
          onAction={() => console.log("View sessions clicked")}
        />
      </div>
    </div>
  );
};

const SecurityCard = ({ title, description, buttonText, onAction, primary = false }) => (
  <div className="bg-gray-50 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <button 
      onClick={onAction}
      className={`${
        primary 
          ? "bg-yellow-400 hover:bg-yellow-500 text-black" 
          : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-300"
      } font-medium py-3 px-6 rounded-xl transition-all duration-200`}
    >
      {buttonText}
    </button>
  </div>
);

export default SecuritySection;