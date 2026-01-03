const express = require("express");
const cors = require("cors");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const connectDB = require("./config/db");
require("./config/cron.js");

const userRoutes = require("./routes/user.routes");

const app = express();

// CORS - allow all for now
app.use(cors());
app.use(express.json());

connectDB();

// API Routes
app.use("/api/users", userRoutes);

// Serve static files from client/public
const clientPath = path.join(__dirname, "..", "..", "client", "public");
app.use(express.static(clientPath));

// For React/Vue apps: Serve index.html for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Root route
app.get("/", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

module.exports = app;