// components/MyAccount/ProfileInfo.jsx
import React from "react";

const ProfileInfo = ({ user }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-xl transition-all duration-200">
          Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-gray-900 font-medium mt-1">{user.name}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="text-sm font-medium text-gray-500">Email Address</label>
            <p className="text-gray-900 font-medium mt-1">{user.email}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="text-sm font-medium text-gray-500">Member Since</label>
            <p className="text-gray-900 font-medium mt-1">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
            />
          ) : (
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;