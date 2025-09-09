import axios, { RawAxiosRequestHeaders } from "axios";

export function convertToBase64(str:string){
    return Buffer.from(str,"utf-8").toString("base64");
}

export async function sendGetRequest(tokens:string , headers:RawAxiosRequestHeaders):Promise<any>{
    const res = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=${tokens}&base64_encoded=true&fields=*`,{
        headers
    });
    
    if(res.data.submissions[0].status.description!="Processing"){
        return res.data;
    }
    
    console.log('Processing... retrying in 1 second');
    await new Promise((resolve)=>setTimeout(resolve,1000));
    return await sendGetRequest(tokens,headers);
}
