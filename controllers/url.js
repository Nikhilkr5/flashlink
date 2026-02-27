const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  // Agar user ne body me URL nahi bheja, toh error return karo
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  // 8 characters ka ek unique ID generate karo
  const shortID = nanoid(8);

  // Database me naya document create karo
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // Response me short ID return kardo
  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};