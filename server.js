const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./connection");

// Humara naya route import kar rahe hain
const urlRoute = require("./routes/url");

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

// Database Connection
connectToMongoDB(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Mongo Error: ", err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", urlRoute);

// Health Check Route
app.get("/", (req, res) => {
  res.send("FlashLink API and MongoDB are Running!");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});