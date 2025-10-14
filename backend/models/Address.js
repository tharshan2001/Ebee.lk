import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Address", addressSchema);
