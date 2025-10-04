import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Add to Wishlist
export const addToWishlist = async (req, res, next) => {
  const userId = req.user.id;  // userId comes from the verified token
  const { productId } = req.body;

  // Log the received data
  console.log('Received productId:', productId);

  try {
    // Check if the product exists in the listings
    const product = await Listing.findById(productId);
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Check if the product is already in the wishlist
    if (user.wishlist?.includes(productId)) {
      return res.status(400).json({ success: false, message: 'Product already in wishlist' });
    }

    // Add product to user's wishlist
    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ success: true, message: 'Product added to wishlist' });
  } catch (err) {
    next(err);  // Pass the error to the error handling middleware
  }
};

// Get Wishlist Products
export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    if (!user) return next(errorHandler(404, 'User not found'));

    res.status(200).json(user.wishlist);
  } catch (err) {
    next(err);
  }
};


// wishlist.controller.js

export const removeFromWishlist = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return next(errorHandler(404, 'User not found'));

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    res.status(200).json({ success: true, message: 'Product removed from wishlist' });
  } catch (err) {
    next(err);
  }
};
