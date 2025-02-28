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

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "https://azshop.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, parameterLimit: 500000, limit: "50mb" })
);
app.use(cookieParser());

//Rotes Imports
const admin = require("./routes/adminRoutes");
app.use("/api/v2/admin", admin);

const category = require("./routes/categoryRoute");
app.use("/api/v2/category", category);

app.use("/api", (req, res) => {
  res.send("API working properly");
});
app.use(errorMiddleware);
module.exports = app;
