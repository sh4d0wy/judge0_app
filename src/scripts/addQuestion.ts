import axios from "axios";
import fs from "fs";
import { question, testcases } from "./question.js";

const token = process.env.TOKEN || ""
const addQuestion = async()=>{
    const response = await axios.post("http://localhost:3000/api/question/add",{
        question,
        testcases
    },{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    console.log(response.data);
}
addQuestion();