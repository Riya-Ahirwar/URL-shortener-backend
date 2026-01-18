const shortid = require("shortid");
const URL = require('../models/url');//datavase

async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: `url is required`});
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home" , {
        id: shortId,
        urls: [],
        error: "Email already registered"
    });
    // return res.json({id: shortId}); we want it onweb not as a json
}
async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
        totalClicks:result.visitHistory.length,
         analytics:result.visitHistory});
}
module.exports = {
    handleGenerateNewShortURL,
     handleGetAnalytics,
}