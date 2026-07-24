import express from "express";
import multer from "multer";
import { protect } from "../middleware/auth.js";
import { uploadImage } from "../controllers/uploadController.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", protect, upload.single("image"), uploadImage);

export default router;
