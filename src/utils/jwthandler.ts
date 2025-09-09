import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const generateToken = (id:mongoose.Types.ObjectId)=>{
    return jwt.sign({id},process.env.JWT_SECRET!,{expiresIn:"10d"});
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token,process.env.JWT_SECRET!);
}