import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addToWishlist);
router.get('/get', verifyToken, getWishlist);
router.post('/remove', verifyToken, removeFromWishlist);

export default router;
