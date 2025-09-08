import express from 'express';


const app = express();

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Get request successful"
    });
})

app.post('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Post request successful"
    })
})

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})