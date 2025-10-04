import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    userlastname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '', // Optional field, can be updated later
    },
    
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    role: {
      type: String,
      enum: ["Buyer", "Seller", "admin"],  // ✅ Ensures only "buyer" or "seller" can be assigned
      required: true,  // ✅ Prevents user creation without a role
    },
    phone: {
      type: String,
      required: false, // Make it optional or set to true if required
      match: /^[0-9]{10}$/, // Optional: regex to validate a 10-digit phone number
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing', // Assuming you have a Listing model
      },
    ],
    verified: { type: Boolean, default: false }

  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
