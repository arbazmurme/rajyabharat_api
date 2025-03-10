const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.js");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

// CORS Configuration
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, parameterLimit: 500000, limit: "50mb" })
);
app.use(cookieParser());

// Route Imports
const admin = require("./routes/adminRoutes");
app.use("/api/v1/admin", admin);

const category = require("./routes/categoryRoute");
app.use("/api/v1/category", category);

const news = require("./routes/newsRoute");
app.use("/api/v1/news", news);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
