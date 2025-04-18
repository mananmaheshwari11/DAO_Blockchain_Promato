import mongoose from "mongoose";

const userModel=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true,
        },
    name:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        default:'0n'
    }
},{timestamps:true})

export default mongoose.model("userModel",userModel);