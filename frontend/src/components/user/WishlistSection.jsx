// components/MyAccount/WishlistSection.jsx
import React from "react";
import EmptyState from "./EmptyState";

const WishlistSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      <EmptyState 
        icon="❤️"
        title="Your Wishlist is Empty"
        description="Save items you love for later"
        buttonText="Explore Products"
        onAction={() => console.log("Explore products clicked")}
      />
    </div>
  );
};

export default WishlistSection;