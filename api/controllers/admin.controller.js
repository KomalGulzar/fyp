import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import Category from "../models/Category.js";
import Message from '../models/Message.js';



// ✅ Get all users (buyers & sellers)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// ✅ Get all listings/products
export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find().populate("userRef", "username email role");
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// ✅ Delete a user (buyer/seller)
export const deleteAnyUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, "User not found"));

    await Listing.deleteMany({ userRef: userId }); // delete user listings
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and their listings deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete a product/listing
export const deleteAnyListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));

    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// admin.controller.js or category.controller.js



export const getAllCategories = async (req, res, next) => {
  try {
    const dbCategories = await Category.find().select("_id name image");

    res.status(200).json(dbCategories);
  } catch (error) {
    next(error);
  }
};


  
  
  
  
  
  // ✅ Create a new category
  // export const createCategory = async (req, res, next) => {
  //   try {
  //     const { name } = req.body;
  
  //     const existingCategory = await Category.findOne({ name });
  //     if (existingCategory) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Category already exists",
  //       });
  //     }
  
  //     const newCategory = new Category({ name });
  //     await newCategory.save();
  
  //     res.status(201).json({
  //       success: true,
  //       message: "Category added successfully",
  //       category: newCategory.name,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // controllers/category.controller.js
 export const createCategory = async (req, res, next) => {
  try {
    const { name, image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    console.log("Image received:", image); // Add this log to check the image URL

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Save the category
    const newCategory = await Category.create({ name, image });

    console.log("New Category Created:", newCategory); // Add this log to confirm the data saved

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (err) {
    next(err);
  }
};


  
  
  
  



  // ✅ Delete a category
  export const deleteCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.id;
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return next(errorHandler(404, "Category not found"));
      }
  
      await Category.findByIdAndDelete(categoryId);
  
      res.status(200).json({ message: `Category '${category.name}' deleted successfully.` });
    } catch (error) {
      next(error);
    }
  };
  



// ✅ Get all contact messages (admin only)

export const getAllMessages = async (req, res) => {
  try {
    // Fetch all messages sorted by creation date (newest first)
    const messages = await Message.find().sort({ createdAt: -1 });

    // Send the fetched messages as response
    res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
};
// ✅ Delete a specific message
export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message.' });
  }
};


  
  
  



