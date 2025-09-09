import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import { config } from "dotenv";
import { convertToBase64, sendGetRequest } from "./utils/judge0helpers.js";
import { codeSnippetSchema } from "./types/index.js";
import userRoutes from "./routes/userRoutes.js";

config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/judge0_app";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const app = express();

app.use(express.json());

const BASE_URL="https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true";

const headers = {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
}


app.post("/submit",async (req,res)=>{
    const {success,data} = codeSnippetSchema.safeParse(req.body);
    if(!success ){
        res.status(413).json({
            err:"There is some error in inputs"
        })
    }
    const {source_code,language_id,testcases} = data!;

    const submissions = testcases.map((test:any)=>{
        return {
            "language_id":language_id,
            "source_code":convertToBase64(source_code),
            "stdin":convertToBase64(test.stdin),
            "expected_output":convertToBase64(test.expected_output)
        }
    });

    try{
        const result = await axios.post(BASE_URL,{
            submissions
        },{
            headers
        });
        const tokens = result.data;
        const stringOfAllTokens = tokens.map((token:any)=>token.token).join(",");
        const getStdOut = await sendGetRequest(stringOfAllTokens,headers) ;
        
        res.status(200).json({
            result:getStdOut
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        });
    }
});

app.use("/api/user",userRoutes);

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})