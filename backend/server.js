import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

// CORS - Allow all origins (for development)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/upload", uploadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error while connecting:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
