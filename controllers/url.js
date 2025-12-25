const shortID = require("shortid");
const URL = require("../model/url");

async function HandlerGenerateShortUrl(req, res) {
    let { url } = req.body;

    // Validate input
    if (!url || !url.trim()) {
        return res.status(400).json({ Error: "URL Required" });
    }

    url = url.trim();

    // Prepend https:// if missing
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    // Generate unique shortId
    let shortId;
    do {
        shortId = shortID();
    } while (await URL.URL.findOne({ shortId }));

    // Save to DB
    await URL.URL.create({
        shortId,
        redirectURL: url,
        visitedHistory: [],
        createdBy: req.user._id,
    });

    // Fetch all URLs for display
    const allurls = await URL.URL.find({});

    // Render home page with new short URL
    return res.render("home", {
        id: shortId,
        urls: allurls,
    });
}

async function HandlerRedirectUrl(req, res) {
    const id = req.params.shortId?.trim();

    if (!id) return res.redirect("/"); // invalid link

    const entry = await URL.URL.findOne({ shortId: id });
    if (!entry) return res.redirect("/"); // shortId not found

    // Track visit
    entry.visitedHistory.push({ timeStamp: Date.now() });
    await entry.save();

    // Redirect to original URL
    return res.redirect(entry.redirectURL);
}

async function HandlerGetAnalytics(req, res) {
    const shortId = req.params.shortId?.trim();

    if (!shortId) return res.status(400).json({ Error: "Invalid Short ID" });

    const result = await URL.URL.findOne({ shortId });
    if (!result) return res.status(404).json({ Error: "Short URL not found" });

    return res.json({
        Total_Clicks: result.visitedHistory.length,
        Analytics: result.visitedHistory,
    });
}

module.exports = {
    HandlerGenerateShortUrl,
    HandlerRedirectUrl,
    HandlerGetAnalytics
};





// const shortID = require("shortid");
// const URL = require("../model/url");

// async function HandlerGenerateShortUrl(req, res) {
//     const shortId = shortID();
//     console.log(shortId);
//     const body = req.body;
//     if (!body) return res.status(400).json({ Error: "URL Required" });
//     await URL.URL.create({
//         shortId: shortId,
//         redirectURL: body.url,
//         visitedHistory: [],
//     });
//     const allurls = await URL.URL.find({});
//     return res.render("home", {
//         id: shortId,
//         urls: allurls,
//     })


// }
// async function HandlerRedirectUrl(req, res) {

//     const id = req.params.shortId.trim();
//     const entry = await URL.URL.findOneAndUpdate({ shortId: id }, {
//         $push: {
//             visitedHistory: {
//                 timeStamp: Date.now(),
//             }
//         }
//     });
//     if (!entry) {
//         return res.status(404).json({ message: "Short URL not found" });
//     }

//     return res.redirect(entry.redirectURL);

// }
// async function HandlerGetAnalytics(req, res) {
//     const shortId = req.params.shortId;

//     const result = await URL.URL.findOne({ shortId });
//     if (!result) return res.json({ "Error": "Error" });
//     return res.json({
//         Total_Clicks: result.visitedHistory.length,
//         Analytics: result.visitedHistory,
//     });

// }

// module.exports = {
//     HandlerGenerateShortUrl, HandlerRedirectUrl, HandlerGetAnalytics
// }