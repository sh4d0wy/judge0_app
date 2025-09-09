import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username:{
                type:String,
                unique:true,
                required:true,
                index:true
        },
        password:{
                type:String,
                required:true
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;