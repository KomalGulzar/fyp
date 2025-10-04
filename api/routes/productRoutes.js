import express from "express";
import Product from "../models/productModel.js"; // Adjust path if needed

const router = express.Router();

// Route to get the latest 4 products
router.get("/latest", async (req, res) => {
  try {
    const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
    res.json(latestProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest products" });
  }
});

export default router; // Correct export for ES Modules
