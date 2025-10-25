import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true }, // mimic Cloudinary's secure_url
  mimetype: { type: String },
  size: { type: Number },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

export default File;
