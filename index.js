const express = require("express");
const {connectToMongoDB} = require('./connections');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const path = require("path");
const app = express();
const PORT = 2006;
//short-url = database name
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("MongoDB is Connected"))
.catch((err) => console.log("Mongo Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));






app.use("/", staticRoute);

app.get('/url/:shortId', async(req , res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
       shortId
    },
    {
     $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
     },
    } ,
     { new: true }   
);

 if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }
//user redirect
res.redirect(entry.redirectURL);

});
app.use("/url", urlRoute);
app.listen(PORT , () => console.log(`Server Started at Port ${PORT}`));