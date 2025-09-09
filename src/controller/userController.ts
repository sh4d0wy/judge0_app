import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwthandler.js";

export const signupUser = async (req:Request,res:Response)=>{
    const {username,password,role} = req.body;

    try{
        const user = new User(
                {
                        username,
                        password:await bcrypt.hash(password,10),
                        role
                });
        await user.save();
        
        const token = generateToken(user._id);        
        res.status(201).json({token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong"});
    }
}

export const signinUser = async (req:Request,res:Response)=>{
    const {username,password} = req.body;
    
    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password!);
        
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid password"});
        }

        const token = generateToken(user._id);
        res.status(200).json({token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong"});
    }
}