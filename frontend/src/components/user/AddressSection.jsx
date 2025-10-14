import React, { useState } from "react";
import { useAddresses } from "../../context/AddressContext.jsx";

const AddressSection = () => {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddresses();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "", phone: "", line1: "", line2: "", city: "", district: "", province: "", postalCode: "", isDefault: true,
  });

  const openModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({ fullName: "", phone: "", line1: "", line2: "", city: "", district: "", province: "", postalCode: "", isDefault: true });
    }
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        await updateAddress(editingAddress._id, formData);
      } else {
        await addAddress(formData);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Shipping Addresses</h2>
        <button onClick={() => openModal()} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-xl transition-all">
          Add Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses.length === 0 && (
          <div className="text-center p-8 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-3xl">📍</p>
            <h3 className="text-xl font-semibold mt-4">No Address Added</h3>
            <p className="text-gray-600 mt-2">Add your shipping address for faster checkout</p>
            <button onClick={() => openModal()} className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-xl">
              Add Your First Address
            </button>
          </div>
        )}

        {addresses.map((address) => (
          <div key={address._id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>{address.fullName}</strong></p>
                <p>{address.phone}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
              </div>
              <div>
                <p>{address.city}, {address.district}</p>
                <p>{address.province} {address.postalCode}</p>
                {address.isDefault && <span className="text-yellow-600 font-medium">Default</span>}
              </div>
            </div>

            <div className="flex justify-end mt-3 space-x-2">
              <button onClick={() => openModal(address)} className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm py-1 px-3 rounded">
                Edit
              </button>
              <button onClick={() => setDeleteConfirm(address._id)} className="bg-red-400 hover:bg-red-500 text-white text-sm py-1 px-3 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">{editingAddress ? "Edit Address" : "Add Address"}</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="w-full border rounded-lg p-2 text-sm" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full border rounded-lg p-2 text-sm" />
              <input name="line1" placeholder="Address Line 1" value={formData.line1} onChange={handleChange} required className="w-full border rounded-lg p-2 text-sm" />
              <input name="line2" placeholder="Address Line 2" value={formData.line2} onChange={handleChange} className="w-full border rounded-lg p-2 text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="border rounded-lg p-2 text-sm" />
                <input name="district" placeholder="District" value={formData.district} onChange={handleChange} required className="border rounded-lg p-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input name="province" placeholder="Province" value={formData.province} onChange={handleChange} required className="border rounded-lg p-2 text-sm" />
                <input name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required className="border rounded-lg p-2 text-sm" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
                <span>Set as default</span>
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <button type="button" onClick={() => setModalOpen(false)} className="py-1 px-3 rounded bg-gray-300 hover:bg-gray-400 text-sm">
                  Cancel
                </button>
                <button type="submit" className="py-1 px-3 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm">
                  {editingAddress ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-xs text-center">
            <h3 className="text-lg font-bold mb-2">Delete Address?</h3>
            <p className="text-gray-600 text-sm mb-4">This action cannot be undone.</p>
            <div className="flex justify-center space-x-2">
              <button onClick={() => setDeleteConfirm(null)} className="py-1 px-3 rounded bg-gray-300 hover:bg-gray-400 text-sm">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="py-1 px-3 rounded bg-red-400 hover:bg-red-500 text-white text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;