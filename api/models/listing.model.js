import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    p_name: {
      type: String,
      required: true,
      maxlength: 200,
    },
    p_desc: {
      type: String,
      required: true,
    },
    p_category: {
      type: String,
      required: true,
      maxlength: 200,
    },
    p_price: {
      type: Number,
      required: true,
    },
    p_imgs: { 
      type: [String], 
      required: true 
    },
    // p_com_id: {
    //   type: Number,
    //   required: true,
    // },
    p_sdesc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    p_order: {
      type: Number,
      required: true,
    },
    // p_trade: {
    //   type: Number,
    //   required: true,
    // },
    userRef: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    sellerEmail: {
      type: String,
      required: true,  // Ensure email is always stored
    },
    sellerUsername: {
      type: String,
      required: true,  // Ensure username is always stored
    },
    
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
