import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
