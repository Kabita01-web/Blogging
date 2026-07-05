import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/:postId/comments").get(getComments).post(protect, addComment);

router.delete("/comments/:id", protect, deleteComment);

export default router;
