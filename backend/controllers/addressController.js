import Address from "../models/Address.js";
import User from "../models/User.js";

// Add new address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user._id; 

    const { fullName, phone, line1, line2, city, district, province, postalCode, isDefault } = req.body;

    if (isDefault) await Address.updateMany({ user: userId }, { isDefault: false });

    const address = await Address.create({
      user: userId,
      fullName,
      phone,
      line1,
      line2,
      city,
      district,
      province,
      postalCode,
      isDefault,
    });

    await User.findByIdAndUpdate(userId, { $push: { addresses: address._id } });

    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all addresses
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;
    const addresses = await Address.find({ user: userId });
    res.status(200).json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update address
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;
    const { fullName, phone, line1, line2, city, district, province, postalCode, isDefault } = req.body;

    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ msg: "Address not found" });

    if (isDefault) await Address.updateMany({ user: userId }, { isDefault: false });

    Object.assign(address, { fullName, phone, line1, line2, city, district, province, postalCode, isDefault });
    await address.save();

    res.status(200).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId } = req.params;

    const address = await Address.findOneAndDelete({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ msg: "Address not found" });

    await User.findByIdAndUpdate(userId, { $pull: { addresses: addressId } });

    res.status(200).json({ success: true, msg: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
