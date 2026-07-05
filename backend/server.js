import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

// TEST ROUTE - Add this to check if POST works
app.post("/test-post", (req, res) => {
  res.json({ message: "POST route is working!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);

// ... rest of code

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error while connecting:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
