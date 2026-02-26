const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middlewares for parsing JSON and Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health Check Route
app.get("/", (req, res) => {
  res.send("FlashLink API is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});