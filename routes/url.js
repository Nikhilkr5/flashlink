const express = require("express");
const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

// POST request: Naya short URL banane ke liye
router.post("/", handleGenerateNewShortURL);

// GET request: Analytics dekhne ke liye
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;