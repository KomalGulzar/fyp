import express from 'express';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    res.status(200).json({ success: true, imageUrl: req.file.path });
});

export default router;
