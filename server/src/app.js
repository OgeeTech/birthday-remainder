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

// ⬇ FIXED CORS CONFIGURATION ⬇
app.use(cors({
    origin: [
        'https://bdremindeer.netlify.app',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ⬇ HANDLE PREFLIGHT REQUESTS ⬇
app.options('*', cors()); // Enable preflight for all routes

app.use(express.json());

connectDB();

// API Routes
app.use("/api/users", userRoutes);

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Birthday Reminder API",
        frontend: "https://bdremindeer.netlify.app",
        endpoints: {
            createUser: "POST /api/users",
            health: "GET /health"
        }
    });
});

module.exports = app;