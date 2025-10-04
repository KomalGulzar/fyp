const mongoose = require("mongoose");

const latestproductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // any other fields
}, {
  timestamps: true, // ⬅️ this will auto add createdAt and updatedAt
});

module.exports = mongoose.model("Product", latestproductSchema);
