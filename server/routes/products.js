import express from "express";
import { adminAuth } from "../middleware/authentication.js";
import Product from "../models/products.js";

const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, stock, image } = req.body;
    const product = await Product.create({
      title,
      price,
      description,
      category,
      stock,
      image,
      userId: req.user._id,
    });
    if (!product) {
      return res.status(400).json({
        error: "Failed to Create Product",
      });
    }
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Failed to Create Product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products.length) {
      return res.status(404).json({
        error: "No Products Found",
      });
    }

    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: "Failed to get Products",
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query } = req.body;
    let products;
    if (query.trim() === "")
      products = await Product.find().sort({ createdAt: -1 });
    else
      products = await Product.find({
        $text: { $search: query },
      });
    if (!products.length) {
      return res.status(404).json({
        error: "No Products Found",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      error: "Failed to get Products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      error: "Failed to get Product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "Product does not Exist",
      });
    }
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "User not authorized",
      });
    }
    await product.remove();
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to delete Product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        error: "User not authorized",
      });
    }
    const keys = Object.keys(req.body);
    console.log(keys);
    keys.forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      error: "Failed to update Product",
    });
  }
};

// ROUTES
const router = express.Router();
router.route("/").get(getAllProducts);
router.route("/create").post(adminAuth, createProduct);
router.route("/search").post(searchProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(adminAuth, deleteProduct)
  .put(adminAuth, updateProduct);
export default router;
