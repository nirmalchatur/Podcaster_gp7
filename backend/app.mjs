import express from "express";
import cookieParser from "cookie-parser";
import userApi from "./routes/user.js";
import CatApi from "./routes/categories.js";
import PodcastApi from "./routes/podcast.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import "./conn/conn.js";
dotenv.config();
require("dotenv").config(); // Load environment variables
require("./conn/conn"); // Database connection

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
