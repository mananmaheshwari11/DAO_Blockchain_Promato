import mongoose from "mongoose";

const promptModel=new mongoose.Schema({
    seller:{
        type: mongoose.ObjectId,
        ref:"userModel",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    fileHash:{
        type:String,
        required:true
    },
    wallet:{
        type:String,
        required:true
    },
    models:[
        {
            type:String,
            required:true
        }
    ]
},{timestamps:true})

export default mongoose.model("promptModel",promptModel);