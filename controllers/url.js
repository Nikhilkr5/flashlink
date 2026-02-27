const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  
  const shortID = nanoid(8);
  
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  
  return res.json({ id: shortID });
}

// 🔥 Naya Logic: URL dhundna aur Redirect karna
async function handleGetAnalyticsAndRedirect(req, res) {
  const shortId = req.params.shortId;
  
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  if (!entry) return res.status(404).send("URL not found!");
  
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalyticsAndRedirect, // Naye function ko export kar diya
};