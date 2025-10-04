// models/category.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    image: {
      type: String, // Assuming the image URL is stored as a string
      required: false, // If you want it to be optional
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
