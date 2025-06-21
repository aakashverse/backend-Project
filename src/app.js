import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    creditentials: true,
}))

app.use(express.json({limit: "16kb"})); // express accepts json files
app.use(express.urlencoded({extended: true, limit: "16kb"})); 
app.use(express.static("public")); // public folder keeps assets like images, favicons 
app.use(cookieParser()); // server se user ka cookies access or cookies set kr pau, only server can read this

export { app };