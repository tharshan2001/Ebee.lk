// components/MyAccount/EmptyState.jsx
import React from "react";

const EmptyState = ({ icon, title, description, buttonText, onAction }) => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {buttonText && (
        <button 
          onClick={onAction}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-8 rounded-xl transition-all duration-200"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;