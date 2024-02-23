import User from "../models/userModel.js";
import bcyptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashPassword=bcyptjs.hashSync(password,10);
    const newUser=new User({ username, email, password:hashPassword});
    try{
        await newUser.save();
        res.status(201).json({
         message:"user created successfully"
        })
    }
    catch(e){
     next(e);
    }
  
}