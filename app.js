import express from "express";
const app = express();
app.use(cors());
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose, { connect } from "mongoose";
import authRoute from './routes/auth.js'
import planRoute from './routes/plan.js'
import { verifyAccessToken } from "./util/verifyToken.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 4500;

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/plan',verifyAccessToken,planRoute)

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        err_msg:err.message,
        status:err.status,
        stack:err.stack
    })
})

const connectDB = () => {
  try {
    mongoose.connect(process.env.URL);
    console.log("Connecting Database...");
  } catch (error) {
    console.log("Error....");
    console.log(error);
  }
};

mongoose.connection.on('connected',()=>{
    console.log("Database Connection Successful...");
})
mongoose.connection.on('disconnected',()=>{
    console.log("Database Connection Failed...");

})
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})

app.listen(port,()=>{
    connectDB()
    console.log(`Listening at ${port}`);
})