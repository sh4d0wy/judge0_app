import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import { config } from "dotenv";
import { convertToBase64, sendGetRequest } from "./utils/judge0helpers.js";
import { codeSnippetSchema } from "./types/index.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoute.js";

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




app.post("/submit",async (req,res)=>{
    
});

app.use("/api/user",userRoutes);
app.use("/api/question",questionRoutes);

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})