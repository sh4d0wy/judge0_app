import axios from "axios";
import { convertToBase64, sendGetRequest } from "./judge0helpers.js";
import { questionType } from "../types/index.js";

const BASE_URL="https://judge0-ce.p.rapidapi.com/submissions/batch?base64_encoded=true";

export const createSubmission = async (question:questionType,source_code:string,language_id:number)=>{
        const headers = {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        };
        const {testcases} = question;

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
            
            return getStdOut;
        }catch(e){
            console.log(e);
            return null;
        }
}