import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwthandler.js";
import Question from "../model/questionModel.js";
import { createSubmission } from "../utils/createSubmission.js";
import { questionType } from "../types/index.js";
import mongoose from "mongoose";

export const signupUser = async (req:Request,res:Response)=>{
    const {username,password} = req.body;
    try{
        const user = new User(
                {
                        username,
                        password:await bcrypt.hash(password,10),
                });
        await user.save();
        
        const token = generateToken(user._id,"user");        
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

        const token = generateToken(user._id,user.role);
        res.status(200).json({token});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong"});
    }
}

export const submitQuestion = async(req:Request,res:Response)=>{
    const {questionId,code,language_id} = req.body;
    
    try{
        const question = await Question.findById(new mongoose.Types.ObjectId(questionId)) as questionType;
        console.log(question);
        if(!question){
            return res.status(404).json({message:"Question not found"});
        }

        const results = await createSubmission(question,code,language_id);
        res.status(201).json({success:true,results});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong"});
    }
}