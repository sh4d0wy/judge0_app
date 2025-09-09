import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (id:mongoose.Types.ObjectId,role:string)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET!,{expiresIn:"10d"});
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token,process.env.JWT_SECRET!);
}