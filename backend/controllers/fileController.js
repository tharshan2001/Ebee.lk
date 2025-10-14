import File from '../models/File.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload a file
export const uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const newFile = new File({
      filename: req.file.filename,
      url,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    await newFile.save();

    res.json({
      message: 'Image uploaded successfully',
      file: newFile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving file info' });
  }
};

// Delete a file by ID
export const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    const filePath = path.join(__dirname, '../uploads', file.filename);

    // Delete file from uploads folder
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete document from MongoDB
    await File.findByIdAndDelete(id);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting file' });
  }
};
