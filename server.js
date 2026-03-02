const express = require("express");
const path = require("path");
require("dotenv").config();
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");

// Apne naye controller ko yahan import kiya
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

// Routes
app.use("/url", urlRoute);

// 🔥 Naya Clean Route! Homepage load hote hi table ka data aayega
app.get("/", handleGetHomePage);

app.get("/:shortId", handleGetAnalyticsAndRedirect);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});