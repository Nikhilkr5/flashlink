const { nanoid } = require("nanoid");
const URL = require("../models/url");
const QRCode = require("qrcode"); // 🔥 QR Code library import ki

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  
  if (!body.url) return res.status(400).json({ error: "url is required" });
  
  let shortID;

  // Custom Alias Logic
  if (body.customAlias) {
      shortID = body.customAlias;
      
      // Check if this custom alias is already taken
      const existingURL = await URL.findOne({ shortId: shortID });
      if (existingURL) {
          const allUrls = await URL.find({}).sort({ _id: -1 });
          return res.render("home", {
              error: "This custom alias is already taken. Please try another one!",
              urls: allUrls
          });
      }
  } else {
      shortID = nanoid(8);
  }
  
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  
  // Naya link banne ke baad latest-first order me fetch karo
  const allUrls = await URL.find({}).sort({ _id: -1 });
  
  // 🔥 MENTOR'S PRO TIP: Dynamic URL generation (Localhost aur Render dono pe chalega)
  const fullShortUrl = `${req.protocol}://${req.get("host")}/${shortID}`;
  
  // 🔥 URL ko QR Code image (Base64) mein convert kiya
  const qrImage = await QRCode.toDataURL(fullShortUrl); 
  
  return res.render("home", {
    id: shortID,
    qrCode: qrImage, // Frontend ko image bhej di
    urls: allUrls, 
    host: `${req.protocol}://${req.get("host")}` // Dynamic host for display
  });
}

async function handleGetHomePage(req, res) {
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