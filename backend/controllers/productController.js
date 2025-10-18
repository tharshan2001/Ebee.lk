import Product from "../models/Product.js";
import slugify from "slugify";

// Helper to generate a unique slug
const generateUniqueSlug = async (name) => {
  let slug = slugify(name, { lower: true, strict: true });
  let exists = await Product.findOne({ slug });

  // Append timestamp if slug already exists
  if (exists) {
    slug = `${slug}-${Date.now()}`;
  }

  return slug;
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // If sent as form-data, multer puts text fields in req.body
    if (!req.body) return res.status(400).json({ message: "No data provided" });

    const {
      name,
      description,
      price,
      category,
      subcategory,
      stock = 0,
      brand = "",
      tags = [],
      features = [],
      colors = [],
      energyRating,
      isNew = false,
      isTrending = false,
    } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "Name, description, price, and category are required" });
    }

    const slug = await generateUniqueSlug(name);

    // If images uploaded via multer
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const newProduct = new Product({
      name,
      slug,
      description,
      price,
      category,
      subcategory,
      images,
      stock,
      brand,
      tags,
      features,
      colors,
      energyRating,
      isNew,
      isTrending,
      isActive: true,
      ratings: { average: 0, count: 0 },
      reviews: [],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Create Product Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug already exists. Try another product name." });
    }
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};


// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get trending products
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true }).limit(10);
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Trending Products Error:", error);
    res.status(500).json({ message: "Error fetching trending products", error: error.message });
  }
};

// Get product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By Slug Error:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
