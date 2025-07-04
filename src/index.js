// require('dotenv').config({path: '.env'}) breaks codes consistency solved by import although it works fine here
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch(() => {
    console.log("MONGO db connection failed !!", err);
})


import express from "express";
const app = express();


/*
( async () => {  // effie in javascript way
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("ERROR: ",error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch(error) {
        console.error("ERROR :", error)
        throw err
    }
})()
    
*/