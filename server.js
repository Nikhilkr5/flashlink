const express = require("express");
const path = require("path"); // 🔥 Naya import
require("dotenv").config();
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const { handleGetAnalyticsAndRedirect } = require("./controllers/url");

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

connectToMongoDB(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Mongo Error: ", err));

// 🔥 EJS Setup (Piyush Garg style SSR)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Form data parse karne ke liye

// Routes
app.use("/url", urlRoute);

// 🔥 Homepage Route (UI dikhane ke liye)
app.get("/", (req, res) => {
  return res.render("home"); // Yeh 'home.ejs' file ko dhundega
});

// Redirect Route
app.get("/:shortId", handleGetAnalyticsAndRedirect);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});