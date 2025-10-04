import express from "express";
import mongoose from "mongoose";
import Inquiry from "../models/inquiry.js";
import Listing from "../models/listing.model.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// ✅ Send Inquiry Route
router.post("/send", verifyToken, async (req, res) => {
  try {
    const { buyerId, buyerUsername, buyerEmail, message, productId } = req.body;

    if (!buyerId || !buyerUsername || !buyerEmail || !message || !productId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId format." });
    }

    // ✅ Fetch product & seller info
    const product = await Listing.findById(productId).populate("userRef", "email username");
    if (!product || !product.userRef) {
      return res.status(404).json({ error: "Product or seller not found." });
    }

    const { email: sellerEmail, username: sellerUsername, _id: sellerId } = product.userRef;

    // ✅ Create and save inquiry
    const inquiry = new Inquiry({
      buyerId,
      buyerUsername,
      buyerEmail,
      message,
      productId,
      sellerId,
      sellerEmail,
      sellerUsername,
    });

    await inquiry.save();

    res.status(201).json({ message: "Inquiry sent successfully!" });
  } catch (error) {
    console.error("❌ Error Saving Inquiry:", error);
    res.status(500).json({ error: "Something went wrong.", details: error.message });
  }
});

// ✅ GET Inquiries for Seller
router.get("/seller/:id", verifyToken, async (req, res) => {
  try {
    const sellerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ error: "Invalid Seller ID format" });
    }

    const inquiries = await Inquiry.find({ sellerId })
      .populate("productId", "p_name p_price")
      .populate("buyerId", "username email avatar") // ✅ Get buyer details
      .sort({ createdAt: -1 });

    if (!inquiries.length) {
      return res.status(404).json({ error: "No inquiries found for this seller." });
    }

    res.status(200).json(inquiries);
  } catch (error) {
    console.error("❌ Error Fetching Seller Inquiries:", error);
    res.status(500).json({ error: "Something went wrong.", details: error.message });
  }
});

// ✅ POST Reply to Inquiry
router.post("/reply/:inquiryId", async (req, res) => {
  try {
    const { inquiryId } = req.params;
    const { reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({ error: "Invalid inquiry ID" });
    }

    if (!reply || reply.trim() === "") {
      return res.status(400).json({ error: "Reply cannot be empty" });
    }

    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    inquiry.reply = reply;
    await inquiry.save();

    res.status(200).json({ message: "Reply saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving reply:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// ✅ GET Inquiries for Buyer
router.get("/buyer/:id", async (req, res) => {
  try {
    const buyerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
      return res.status(400).json({ error: "Invalid Buyer ID format" });
    }

    const inquiries = await Inquiry.find({ buyerId })
      .populate("productId", "p_name p_price")
      .populate("sellerId", "username email avatar") // Optional: show seller too
      .sort({ createdAt: -1 });

    if (!inquiries.length) {
      return res.status(404).json({ error: "No inquiries found for this buyer." });
    }

    res.status(200).json(inquiries);
  } catch (error) {
    console.error("❌ Error Fetching Buyer Inquiries:", error);
    res.status(500).json({ error: "Something went wrong.", details: error.message });
  }
});

export default router;
