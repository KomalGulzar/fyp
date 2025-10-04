import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    buyerUsername: { type: String, required: true, trim: true }, // ✅ Buyer’s name
    buyerEmail: { 
      type: String, 
      required: true, 
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // ✅ Basic email validation
    },
    message: { type: String, required: true, trim: true },
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Listing", 
      required: true 
    }, // ✅ Reference to Product
    sellerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true // ✅ Indexed for faster queries
    }, // ✅ Reference to Seller
    sellerEmail: { 
      type: String, 
      required: true, 
      trim: true 
    }, // ✅ Directly store seller's email for quick access
    sellerUsername: { 
      type: String, 
      required: true, 
      trim: true 
    }, // ✅ Store seller’s username
    reply: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
