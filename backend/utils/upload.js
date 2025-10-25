import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // file extension
    const baseName = path.basename(file.originalname, ext); // original name without extension
    const nameSlug = slugify(baseName, { lower: true, strict: true }); // slugify original name
    const uniqueSuffix = Date.now(); // timestamp for uniqueness
    cb(null, `${nameSlug}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
});

export default upload;
