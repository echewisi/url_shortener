const express= require("express");
const mongoose= require("mongoose");
const ShortUrl= require("./models/shorturls");
const shorturls = require("./models/shorturls");
const app= express();

mongoose.connect('mongodb://localhost/url3030',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.urlencoded({extended: false }))
app.listen(process.env.PORT||5000);

app.set("view engine", "ejs");

app.get("/", async (req, res)=>{
    const shorturls= await ShortUrl.find()
    res.render("index", {shorturls: shorturls})
})



app.post("/shorturls", async (req, res)=>{
    await ShortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})

app.get("/:shortUrl", async (req,res)=>{
    const shortUrl= await ShortUrl.findOne(req.params.shortUrl)
    if(shortUrl== null){
        return res.sendStatus(404)
    }
    else{
        shortUrl.clicks++
        shortUrl.save()

        return res.redirect(shortUrl.full)
    }

})