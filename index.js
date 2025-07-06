const express = require('express');
const mongoose = require('mongoose');

const {connectToMongoDb}=require('./connect');

const urlRoute= require('./routes/url');

const app= express();
const PORT=8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});