const express = require('express');
const path = require('path');
const cookieParser=require("cookie-parser")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middlewares/auth")

const URL = require('./models/url')
const mongoose = require('mongoose');

const {connectToMongoDb}=require('./connect');

// Routes
const urlRoute= require('./routes/url');
const staticRoute = require('./routes/staticRouter')
const userRoute= require("./routes/user");

const app= express();
const PORT=8001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));


// telling express which view engine to use - ejs
app.set("view engine","ejs");

// telling app the path of ejs files - inside ./views folder - import path module 
app.set("views",path.resolve("./views"))

app.use("/url",restrictToLoggedinUserOnly, urlRoute);
app.use("/user",userRoute);
app.use("/",checkAuth, staticRoute);

// app.get("/test", async(req,res)=>{
//     const allUrls= await URL.find({});
//     return res.render('home',{
//         urls: allUrls,
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});