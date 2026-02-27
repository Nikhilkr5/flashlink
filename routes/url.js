const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");

const router = express.Router();

// POST request aayegi toh handleGenerateNewShortURL function chalega
router.post("/", handleGenerateNewShortURL);

module.exports = router;