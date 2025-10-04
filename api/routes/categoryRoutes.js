import express from "express";
import Category from "../models/Category.js"; // Admin-created categories
import Listing from "../models/listing.model.js"; // Just in case you use this later

const router = express.Router();

// ✅ Public route to fetch admin-defined categories only
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find({}, "name"); // Fetch only name field
    const categoryNames = categories.map((cat) => cat.name); // Extract just names
    res.status(200).json(categoryNames);
  } catch (error) {
    console.error("Error fetching categories:", error);
    next(error); // Forward to error handler
  }
});

export default router;
