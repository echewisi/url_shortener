const express= require("express");
const mongoose= require("mongoose");
const ShortUrl= require("./models/shorturls")
const app= express();

mongoose.connect('mongodb://localhost/url3030',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.use(express.urlencoded({extended: false }))
app.listen(process.env.PORT||5000);

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render("index")
})

app.post("/shorturls", async (req, res)=>{
    await ShortUrl.create({full:req.body.fullUrl})
    res.redirect('/')
})