// import express from 'express';
// import { createListing, deleteListing, updateListing, getListing, getListings, getCategories } from '../controllers/listing.controller.js';
// import { verifyToken } from '../utils/verifyUser.js';

// const router = express.Router();

// router.post('/create', verifyToken, createListing);
// router.delete('/delete/:id', verifyToken, deleteListing);
// router.post('/update/:id', verifyToken, updateListing);
// router.get('/get/:id', getListing);
// router.get('/get', getListings);
// router.get('/categories', getCategories); 


// export default router;




import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, getCategories, getProductsByCategory, getLatestListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

// ✅ Add this new route for categories
router.get('/categories', getCategories);
router.get("/category/:categoryName", getProductsByCategory);
// ✅ GET LATEST LISTINGS
router.get("/latest", getLatestListings);

export default router;
