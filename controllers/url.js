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
  
  // 🔥 PRO UPDATE: Naya link banne ke baad saare URLs latest-first order me fetch karo
  const allUrls = await URL.find({}).sort({ _id: -1 });
  
  return res.render("home", {
    id: shortID,
    urls: allUrls, 
  });
}

// 🔥 Naya Pro Logic: Homepage render karne ke liye (Table dikhane ke liye)
async function handleGetHomePage(req, res) {
  // 🔥 PRO UPDATE: Yahan bhi table ke data ko latest-first order me fetch kiya
  const allUrls = await URL.find({}).sort({ _id: -1 });
  return res.render("home", {
    urls: allUrls,
  });
}

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

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(404).json({ error: "URL not found" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalyticsAndRedirect,
  handleGetAnalytics,
  handleGetHomePage, 
};