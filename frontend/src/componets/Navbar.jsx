const express = require("express");
const app = express();
const PORT = 5000;

// Basic middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Blogging Platform API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
