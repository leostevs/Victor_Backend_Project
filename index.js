const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./env" });

const app = express();
app.use(express.json());

const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')
const users = require('./routes/users')

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database not connected"));

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "Welcome to my server",
  });
});

app.use("/auth", authRoute);
app.use("/blogs", blogRoute)
app.use("/users", blogRoute)

app.use("*", (req, res) => {
  res.status(400).json({
    message: "Route Not defined",
  });
});

app.listen("2000", () => {
  console.log(`Application started at port 2000`);
});
