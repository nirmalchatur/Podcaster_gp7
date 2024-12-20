const express = require("express");
const cookieParser = require("cookie-parser");
const userApi = require("./routes/user");
const CatApi = require("./routes/categories");
const PodcastApi = require("./routes/podcast");
const cors = require("cors");

const path = require("path");

require("dotenv").config(); // Load environment variables
require("./conn/conn"); // Database connection

const app = express(); // Define the app instance

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || ["http://localhost:5173"], // Default to development origin if not set
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // JSON parser for incoming requests
app.use(cookieParser()); // Cookie parser for handling cookies
app.use("/uploads", express.static(path.join(__dirname, "/frontend/dist"))); // Serve static files from uploads directory
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// API Routes
app.use("/api/v1", userApi);
app.use("/api/v1", CatApi);
app.use("/api/v1", PodcastApi);

// Server
const PORT = process.env.PORT || 1000; // Use default port if none specified
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
