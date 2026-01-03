const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
require("./config/cron.js");

console.log("Server Current Time:", new Date().toString());

const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
