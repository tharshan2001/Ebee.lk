import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios"; 
// Create Context
const AddressContext = createContext();

// Provider Component
export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/address");
      setAddresses(res.data.addresses);
      setError(null);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError(err.response?.data?.error || "Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  // Add a new address
  const addAddress = async (addressData) => {
    try {
      const res = await api.post("/address", addressData);
      setAddresses((prev) => [...prev, res.data.address]);
      return res.data.address;
    } catch (err) {
      console.error("Error adding address:", err);
      throw err;
    }
  };

  // Update an existing address
  const updateAddress = async (addressId, updatedData) => {
    try {
      const res = await api.put(`/address/${addressId}`, updatedData);
      setAddresses((prev) =>
        prev.map((addr) => (addr._id === addressId ? res.data.address : addr))
      );
      return res.data.address;
    } catch (err) {
      console.error("Error updating address:", err);
      throw err;
    }
  };

  // Delete an address
  const deleteAddress = async (addressId) => {
    try {
      await api.delete(`/address/${addressId}`);
      setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
    } catch (err) {
      console.error("Error deleting address:", err);
      throw err;
    }
  };

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        error,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// Custom hook to use Address context
export const useAddresses = () => {
  return useContext(AddressContext);
};
