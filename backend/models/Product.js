import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: 100,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
      validate: [(val) => val.length <= 10, "Maximum 10 images allowed"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    brand: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    energyRating: {
      type: String,
      trim: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, trim: true },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true }
);

// Text index for searching
productSchema.index({ name: "text", description: "text", tags: 1 });
// Index for filtering
productSchema.index({ price: 1, stock: 1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
