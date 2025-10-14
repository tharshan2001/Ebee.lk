// components/MyAccount/OrdersSection.jsx
import React from "react";
import EmptyState from "./EmptyState";

const OrdersSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <EmptyState 
        icon="📦"
        title="No Orders Yet"
        description="Your orders will appear here"
        buttonText="Start Shopping"
        onAction={() => console.log("Start shopping clicked")}
      />
    </div>
  );
};

export default OrdersSection;