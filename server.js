const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

// Apne naye controller logic ko yahan import kiya
const { handleGetAnalyticsAndRedirect } = require("./controllers/url"); 

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL;

connectToMongoDB(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("Mongo Error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST request yahan jayegi (Short ID banne ke liye)
app.use("/url", urlRoute);

// GET request yahan aayegi (Redirect hone ke liye)
app.get("/:shortId", handleGetAnalyticsAndRedirect);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});