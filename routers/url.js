const express = require("express");
const { HandlerGenerateShortUrl, HandlerRedirectUrl, HandlerGetAnalytics } = require("../controllers/url")

const router = express.Router();

router.post('/', HandlerGenerateShortUrl);
router.get("/analytics/:shortId", HandlerGetAnalytics);
router.get("/:shortId", HandlerRedirectUrl);



module.exports = router;