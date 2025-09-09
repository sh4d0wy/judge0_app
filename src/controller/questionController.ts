import { Request, Response } from "express";
import Question from "../model/questionModel.js";

export const addQuestion = async (req:Request,res:Response)=>{
    const {question,testcases} = req.body;

    try{
        const q = new Question({question,testcases,createdBy:(req as any).id});
        await q.save();
        res.status(201).json({success:true,question:q});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"Something went wrong"});
    }
}