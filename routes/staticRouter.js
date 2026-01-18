const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
const router = express.Router();

router.get("/admin/urls" , restrictTo(['ADMIN']), async (req , res) => {
   // if(!req.user) return res.redirect("/login");
     const allurls = await URL.find({});
     res.render("home", { 
        id: null,
        urls : allurls,
     });

});
router.get("/" , restrictTo(['NORMAL','ADMIN']), async (req , res) => {
   // if(!req.user) return res.redirect("/login");
     const allurls = await URL.find({createdBy: req.user._id});
     res.render("home", { 
        id: null,
        urls : allurls,
     });

});
router.get("/signup" , (req , res) => {
   return res.render("signup");
});
router.get("/login" , (req , res) => {
   return res.render("login");
})
module.exports = router;