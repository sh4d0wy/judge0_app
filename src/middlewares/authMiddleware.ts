import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwthandler.js";
import { DecodedToken } from "../types/index.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

export async function adminOnlyMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const decoded = verifyToken(token) as DecodedToken;
    (req as any).id = decoded.id;

    if(decoded.role !== "admin"){
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}

export async function userAuthMiddleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"User not logged in"});
    }
    const decoded = verifyToken(token) as DecodedToken;
    const id = decoded.id;
    const user = await User.findById(new mongoose.Types.ObjectId(id));
    if(!user){
        return res.status(401).json({message:"User not found"});
    }
    next();
}