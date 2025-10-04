import express from 'express';
import { deleteUser, test, updateUser, getUserListing, getUser, createMessage } from '../controllers/user.controller.js';
import { verifyToken,  } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);  // ✅ Use PUT instead of POST
router.delete('/delete/:id', verifyToken, deleteUser);  // ✅ Use PUT instead of POST
router.get('/listings/:id', verifyToken, getUserListing );  // ✅ Use PUT instead of POST
router.get('/:id', verifyToken, getUser );  


// Send Messages to the Admin
router.post('/message', createMessage);





export default router;
