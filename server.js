const express = require("express");
const path = require("path");
require("dotenv").config();
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

// 🔥 1. Package Import kiya
const rateLimit = require("express-rate-limit"); 

const { handleGetAnalyticsAndRedirect, handleGetHomePage } = require("./controllers/url"); 

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

connectToMongoDB(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Mongo Error: ", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔥 2. Rate Limiter ka rule banaya
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes ka time window
    max: 20, // TESTING KE LIYE 3 RAKHA HAI. (Baad me isko 20-50 kar dena)
    message: "Too many requests from this IP, please try again after 15 minutes.",
    standardHeaders: true, 
    legacyHeaders: false,
});

// Routes
// 🔥 3. Limiter ko specifically sirf '/url' par lagaya (jahan naye links bante hain)
app.use("/url", limiter, urlRoute);

// Homepage and Redirect Routes
app.get("/", handleGetHomePage);
app.get("/:shortId", handleGetAnalyticsAndRedirect);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});