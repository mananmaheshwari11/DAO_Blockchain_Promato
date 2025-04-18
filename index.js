import express from "express";
import cors from "cors"
import morgan from "morgan";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./apiroutes/Routes.js";
dotenv.config()
connectDb();

const app=express();
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/promato',router);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})