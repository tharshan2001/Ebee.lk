import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true, required: true },
    avatar: String,
    password: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
