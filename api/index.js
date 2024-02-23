import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
dotenv.config();
const app =express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log(err)
    process.exit(1);
})
  
app.use("/api/user",userRouter)



app.listen(3000,()=>{
    console.log("server is running on port 3000!!")
})