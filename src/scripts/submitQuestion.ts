import axios from "axios";
import fs from "fs";
import { config } from "dotenv";

config();

const solution = fs.readFileSync("src/scripts/solution.py", "utf-8");

const fetchData = async()=>{
        const token = process.env.TOKEN || ""
        console.log("token",token);
        if(!token){
            throw new Error("TOKEN is not set");
        }
        const response = await axios.post("http://localhost:3000/api/user/submit",{
                questionId:"68c14a96a7c40a7fbaabec2e",
                language_id:100,
                code:solution,
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        console.log(response.data);
        fs.writeFileSync("src/scripts/response.json",JSON.stringify(response.data,null,2));
}
fetchData();
