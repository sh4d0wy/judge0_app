import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
        question:String,
        testcases:Array<{
                stdin:String,
                expected_output:String
        }>,
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
},{timestamps:true})

const Question = mongoose.model("Question",questionSchema);

export default Question;