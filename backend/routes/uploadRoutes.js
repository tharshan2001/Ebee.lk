import express from 'express';
import upload from '../utils/upload.js';
import { uploadFile, deleteFile } from '../controllers/fileController.js';

const router = express.Router();

// Upload
router.post('/upload', upload.single('file'), uploadFile);

// Delete
router.delete('/:id', deleteFile);

export default router;
