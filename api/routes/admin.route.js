import express from 'express';
import { verifyAdmin } from '../utils/verifyUser.js'; // we'll write this next
import { getAllUsers, deleteAnyUser, getAllListings, deleteAnyListing, getAllCategories, deleteCategory, createCategory, deleteMessage, getAllMessages  } from '../controllers/admin.controller.js';
// import { createMessage, deleteMessage, getAllMessages } from '../controllers/adminMessages.controller.js';

const router = express.Router();

// ✅ Admin-only routes
router.get('/users', verifyAdmin, getAllUsers);
router.delete('/user/:id', verifyAdmin, deleteAnyUser);

router.get('/listings', verifyAdmin, getAllListings);
router.delete('/listing/:id', verifyAdmin, deleteAnyListing);

// In routes/admin.js
router.get('/categories', verifyAdmin, getAllCategories);
// router.get('/categories', verifyAdmin, getAllCategories);
router.post("/category", verifyAdmin, createCategory);
router.delete("/category/:id", verifyAdmin, deleteCategory);
// router.get('/admin/categories',verifyAdmin, getCategories);

// ✅ Admin-only access to contact messages
// ✅ Public: Send message from contact form
// router.post('/message', createMessage);

// ✅ Admin-only: View all messages
router.get('/messages', verifyAdmin, getAllMessages);

// ✅ Admin-only: Delete a specific message
router.delete('/message/:id', verifyAdmin, deleteMessage);


export default router;
